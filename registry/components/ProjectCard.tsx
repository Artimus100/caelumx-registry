import React from 'react';
// import { Project } from '../app/types/ledger';
import { format } from 'date-fns';
import { CircleDashed } from 'lucide-react';

interface ProjectCardProps {
  project: any;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const progress = (project.soldCredits / project.totalCredits) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${
              project.status === 'verified'
                ? 'bg-green-100 text-green-800'
                : project.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            }`}
        >
          {project.status}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Credits Sold</span>
            <span>{project.soldCredits} / {project.totalCredits}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <CircleDashed className="w-4 h-4" />
            <span>Last Updated</span>
          </div>
          <span>{format(project.lastUpdated, 'PP')}</span>
        </div>
      </div>
    </div>
  );
}