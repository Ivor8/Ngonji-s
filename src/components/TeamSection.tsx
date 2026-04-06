import React from 'react';
import { TEAM_MEMBERS, ENTITIES } from '@/data/constants';
import { Linkedin, Mail } from 'lucide-react';

const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Leadership Team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Meet Our <span className="text-blue-700">Leaders</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experienced professionals driving excellence across all four business entities.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, i) => {
            const entityColor = ENTITIES[member.entity as keyof typeof ENTITIES]?.color || '#1e40af';
            return (
              <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="relative h-72 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-lg">{member.name}</h3>
                    <p className="text-white/80 text-sm">{member.role}</p>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entityColor }} />
                    <span className="text-xs font-medium text-gray-500">
                      {ENTITIES[member.entity as keyof typeof ENTITIES]?.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
