import Feedback from '../models/Feedback.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';

export const createFeedback = catchAsync(async (req, res) => {
  const feedback = await Feedback.create(req.body);
  
  res.status(201).json({
    success: true,
    message: 'Feedback submitted successfully',
    data: feedback
  });
});

export const getAllFeedback = catchAsync(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    category,
    status,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    search
  } = req.query;

  // Build filter object
  const filter = {};
  if (category) filter.category = category;
  if (status) filter.status = status;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { message: { $regex: search, $options: 'i' } }
    ];
  }

  // Build sort object
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  // Calculate pagination
  const skip = (page - 1) * limit;

  const [feedbacks, total] = await Promise.all([
    Feedback.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v'),
    Feedback.countDocuments(filter)
  ]);

  res.status(200).json({
    success: true,
    data: feedbacks,
    pagination: {
      current: parseInt(page),
      pages: Math.ceil(total / limit),
      total,
      hasNext: page * limit < total,
      hasPrev: page > 1
    }
  });
});

export const getFeedbackById = catchAsync(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);
  
  if (!feedback) {
    throw new AppError('Feedback not found', 404);
  }

  res.status(200).json({
    success: true,
    data: feedback
  });
});

export const updateFeedbackStatus = catchAsync(async (req, res) => {
  const feedback = await Feedback.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );

  if (!feedback) {
    throw new AppError('Feedback not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Feedback status updated successfully',
    data: feedback
  });
});

export const deleteFeedback = catchAsync(async (req, res) => {
  const feedback = await Feedback.findByIdAndDelete(req.params.id);

  if (!feedback) {
    throw new AppError('Feedback not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Feedback deleted successfully'
  });
});

export const getFeedbackAnalytics = catchAsync(async (req, res) => {
  const [
    categoryStats,
    statusStats,
    ratingStats,
    monthlyStats,
    totalFeedback,
    averageRating
  ] = await Promise.all([
    // Category k liye
    Feedback.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]),
    
    // Status k liye
    Feedback.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]),
    
    // Rating k liye
    Feedback.aggregate([
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]),
    
    // Monthly feedback count last 6 months k liye
    Feedback.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]),
    
    Feedback.countDocuments(),
    
    // Average rating count krne k liye
    Feedback.aggregate([
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ])
  ]);

  res.status(200).json({
    success: true,
    data: {
      categoryStats,
      statusStats,
      ratingStats,
      monthlyStats,
      totalFeedback,
      averageRating: averageRating[0]?.avgRating || 0
    }
  });
});