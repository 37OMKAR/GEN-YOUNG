/**
 * Gen-Young Community Hub
 * Path: src/components/hubs/CommunityHub.tsx
 *
 * Reflects docs/assets/10-youth-community.png — featured communities,
 * upcoming events, join/leave state.
 */

import React from 'react';
import { Users, Calendar, MessageCircle, Lightbulb, Handshake, Star, Check } from 'lucide-react';
import { HubModal } from './HubModal';
import { useDemo, mockCommunities, mockCommunityEvents } from '../../context/DemoContext';
import { useToast } from '../../context/ToastContext';

const benefitTiles = [
  { icon: MessageCircle, label: 'Share Your Story', body: 'Inspire and be inspired by real journeys' },
  { icon: Lightbulb, label: 'Learn Together', body: 'Live sessions, expert talks, peer learning' },
  { icon: Handshake, label: 'Support Each Other', body: 'Ask questions, get advice, find a mentor' },
  { icon: Star, label: 'Unlock Opportunities', body: 'Internships, events, collaborations' },
];

interface CommunityHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommunityHub: React.FC<CommunityHubProps> = ({ isOpen, onClose }) => {
  const { communityJoins, joinCommunity, leaveCommunity, isCommunityJoined } = useDemo();
  const { showToast } = useToast();

  const handleJoin = (id: string, name: string) => {
    if (isCommunityJoined(id)) {
      leaveCommunity(id);
      showToast(`Left ${name}`, 'success');
    } else {
      const result = joinCommunity(id);
      if (result.success) showToast(`Joined ${name}`, 'success');
    }
  };

  return (
    <HubModal
      isOpen={isOpen}
      onClose={onClose}
      title="Youth Community"
      subtitle="Connect · Learn · Share · Grow"
      headerAccent="from-violet-500 to-indigo-500"
    >
      {/* Value tiles */}
      <section className="grid grid-cols-2 gap-2" aria-label="Community benefits">
        {benefitTiles.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.label}
              className="p-2.5 rounded-xl bg-slate-850 border border-slate-700/60"
            >
              <Icon size={16} className="text-violet-300" />
              <span className="block text-xs font-bold text-white mt-1.5">{t.label}</span>
              <span className="block text-[10px] text-slate-400 mt-0.5 leading-snug">{t.body}</span>
            </div>
          );
        })}
      </section>

      {/* Featured communities */}
      <section className="mt-4" aria-label="Featured communities">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
          <Users size={12} className="text-violet-400" />
          Featured Communities
        </h3>
        <div className="space-y-2.5">
          {mockCommunities.map((c) => {
            const joined = isCommunityJoined(c.id);
            return (
              <div
                key={c.id}
                className="p-3 rounded-xl bg-slate-850 border border-slate-700/60 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-500/15 border border-violet-500/30 text-violet-300">
                        {c.tag}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {c.memberCount.toLocaleString('en-IN')} members
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white mt-1">{c.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{c.description}</p>
                  </div>
                  <button
                    onClick={() => handleJoin(c.id, c.name)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold shrink-0 border transition-colors ${
                      joined
                        ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                        : 'bg-violet-500 text-white border-violet-500 hover:bg-violet-400'
                    }`}
                  >
                    {joined ? (
                      <span className="flex items-center gap-1">
                        <Check size={11} /> Joined
                      </span>
                    ) : (
                      'Join'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Upcoming events */}
      <section className="mt-4" aria-label="Upcoming events">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
          <Calendar size={12} className="text-violet-400" />
          Upcoming Events
        </h3>
        <ul className="space-y-2">
          {mockCommunityEvents.map((evt) => (
            <li
              key={evt.id}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800"
            >
              <div className="w-11 h-11 rounded-lg bg-violet-500/15 border border-violet-500/30 flex flex-col items-center justify-center shrink-0">
                <span className="text-[8px] font-bold text-violet-300 uppercase">
                  {evt.dateLabel.split(' ')[0]}
                </span>
                <span className="text-xs font-mono font-bold text-white leading-none">
                  {evt.dateLabel.split(' ')[1]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-white block">{evt.title}</span>
                <span className="text-[10px] text-slate-400">
                  {evt.format} · {evt.time}
                </span>
              </div>
              <span className="text-[10px] text-violet-300 font-bold shrink-0">Register</span>
            </li>
          ))}
        </ul>
      </section>

      {communityJoins.length > 0 && (
        <div className="mt-4 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-200 text-center">
          You&apos;re a member of <b>{communityJoins.length}</b>{' '}
          {communityJoins.length === 1 ? 'community' : 'communities'}.
        </div>
      )}
    </HubModal>
  );
};
