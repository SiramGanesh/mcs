// ============================================
// Complaint Card Component
// ============================================
// Displays a single complaint as a card.
// Used in lists/grids of complaints.
// Shows: title, issue type, status, date, location
// ============================================

import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const ComplaintCard = ({ complaint, onDelete }) => {
  const { user } = useAuth();

  // Format date to readable string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get a nice label for issue type
  const getIssueTypeLabel = (type) => {
    const labels = {
      road: '🛣️ Road',
      water: '💧 Water',
      garbage: '🗑️ Garbage',
      sanitation: '🚿 Sanitation',
      electricity: '⚡ Electricity',
      other: '📋 Other',
    };
    return labels[type] || type;
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        await api.delete(`/complaints/${complaint._id}`);
        if (onDelete) {
          onDelete(complaint._id);
        } else {
          window.location.reload();
        }
      } catch (error) {
        console.error('Error deleting complaint:', error);
        alert('Failed to delete complaint');
      }
    }
  };

  // Check if the current user is the creator
  const isCreator = user && complaint.userId && (
    complaint.userId === user._id || complaint.userId._id === user._id
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Card Header */}
      <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-700">{getIssueTypeLabel(complaint.issueType)}</span>
        <StatusBadge status={complaint.status} />
      </div>

      {/* Card Body */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">{complaint.title}</h3>
        <p className="text-gray-600 text-sm mb-3">
          {complaint.description.length > 100
            ? complaint.description.substring(0, 100) + '...'
            : complaint.description}
        </p>

        <div className="space-y-1 text-sm text-gray-500">
          <p>📍 {complaint.location}</p>
          <p>📅 {formatDate(complaint.createdAt)}</p>
          {complaint.departmentId && (
            <p>🏢 {complaint.departmentId.departmentName || 'Assigned'}</p>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4 border-t border-gray-200 flex justify-between items-center">
        <Link to={`/complaints/${complaint._id}`} className="inline-block bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm">
          View Details →
        </Link>
        {isCreator && complaint.status !== 'Resolved' && (
          <button 
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
          >
            🗑️ Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ComplaintCard;
