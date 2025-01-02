'use-client';
import React from 'react';
import { CreditStatus } from '../../types/ledger';
import { Shield, Clock, Check, Archive } from 'lucide-react';

interface ProjectStatusBadgeProps {
  status: CreditStatus;
}

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          className: 'bg-yellow-100 text-yellow-800',
        };
      case 'verified':
        return {
          icon: Shield,
          className: 'bg-green-100 text-green-800',
        };
      case 'available':
        return {
          icon: Check,
          className: 'bg-blue-100 text-blue-800',
        };
      case 'retired':
        return {
          icon: Archive,
          className: 'bg-purple-100 text-purple-800',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      <Icon className="w-3 h-3" />
      <span className="capitalize">{status}</span>
    </span>
  );
}