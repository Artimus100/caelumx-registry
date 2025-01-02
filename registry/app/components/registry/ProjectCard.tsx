'use-client';
import React from 'react';
import { Shield, MapPin, TreePine } from 'lucide-react';
import { ProjectStatusBadge } from '../projects/ProjectStatusBadge';
import type { CreditProject } from '../../types/ledger';

interface ProjectCardProps {
  project: CreditProject;
  onVerify?: () => void;
}

export function ProjectCard({ project, onVerify }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <ProjectStatusBadge status={project.status} />
      </div>

      <div className="space-y-4">
        <p className="text-gray-600">{project.description}</p>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="w-4 h-4" />
          <span>{project.location}</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <TreePine className="text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Available Credits</p>
              <p className="text-lg font-semibold">{project.availableCredits}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <Shield className="text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Retired Credits</p>
              <p className="text-lg font-semibold">{project.retiredCredits}</p>
            </div>
          </div>
        </div>

        {project.status === 'pending' && onVerify && (
          <button
            onClick={onVerify}
            className="w-full py-2 bg-caelum-600 text-white rounded-lg hover:bg-caelum-700 transition-colors"
          >
            Verify Project
          </button>
        )}
      </div>
    </div>
  );
}