import React from 'react';

// 曼城简化队徽 - 帆船图标
export const CityBadgeIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="15" fill="#6CABDD" stroke="#1C2C5C" strokeWidth="2"/>
    {/* 帆船主体 */}
    <path d="M16 8L12 20h8L16 8z" fill="#FFFFFF"/>
    {/* 帆船桅杆 */}
    <line x1="16" y1="8" x2="16" y2="24" stroke="#1C2C5C" strokeWidth="1"/>
    {/* 三条斜杠 */}
    <path d="M8 14L24 14" stroke="#FFD700" strokeWidth="1"/>
    <path d="M9 16L23 16" stroke="#FFD700" strokeWidth="1"/>
    <path d="M10 18L22 18" stroke="#FFD700" strokeWidth="1"/>
  </svg>
);

// 足球图标
export const FootballIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#FFFFFF" stroke="#000000" strokeWidth="1"/>
    <path d="M12 2L8 8h8L12 2z" fill="#000000"/>
    <path d="M12 22L8 16h8L12 22z" fill="#000000"/>
    <path d="M2 12L8 8v8L2 12z" fill="#000000"/>
    <path d="M22 12L16 8v8L22 12z" fill="#000000"/>
    <path d="M8 8L16 8L16 16L8 16z" fill="none" stroke="#000000" strokeWidth="1"/>
  </svg>
);

// 奖杯图标
export const TrophyIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 4V2C7 1.44772 7.44772 1 8 1H16C16.5523 1 17 1.44772 17 2V4" stroke="#FFD700" strokeWidth="2"/>
    <path d="M7 4H17V12C17 14.2091 15.2091 16 13 16H11C8.79086 16 7 14.2091 7 12V4Z" fill="#FFD700"/>
    <path d="M5 6H7V10H5C4.44772 10 4 9.55228 4 9V7C4 6.44772 4.44772 6 5 6Z" fill="#FFD700"/>
    <path d="M17 6H19C19.5523 6 20 6.44772 20 7V9C20 9.55228 19.5523 10 19 10H17V6Z" fill="#FFD700"/>
    <rect x="9" y="16" width="6" height="2" fill="#FFD700"/>
    <rect x="7" y="18" width="10" height="4" rx="1" fill="#FFD700"/>
  </svg>
);

// 球门图标
export const GoalIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="8" width="20" height="12" rx="1" fill="none" stroke="#4CAF50" strokeWidth="2"/>
    <line x1="2" y1="12" x2="22" y2="12" stroke="#4CAF50" strokeWidth="1"/>
    <line x1="2" y1="16" x2="22" y2="16" stroke="#4CAF50" strokeWidth="1"/>
    <line x1="6" y1="8" x2="6" y2="20" stroke="#4CAF50" strokeWidth="1"/>
    <line x1="10" y1="8" x2="10" y2="20" stroke="#4CAF50" strokeWidth="1"/>
    <line x1="14" y1="8" x2="14" y2="20" stroke="#4CAF50" strokeWidth="1"/>
    <line x1="18" y1="8" x2="18" y2="20" stroke="#4CAF50" strokeWidth="1"/>
  </svg>
);

// 体育场图标
export const StadiumIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="18" rx="10" ry="4" fill="#4CAF50"/>
    <path d="M2 14C2 12 6.5 10 12 10C17.5 10 22 12 22 14V18C22 20 17.5 22 12 22C6.5 22 2 20 2 18V14Z" fill="#6CABDD" fillOpacity="0.3"/>
    <rect x="4" y="6" width="2" height="8" fill="#1C2C5C"/>
    <rect x="8" y="4" width="2" height="10" fill="#1C2C5C"/>
    <rect x="14" y="4" width="2" height="10" fill="#1C2C5C"/>
    <rect x="18" y="6" width="2" height="8" fill="#1C2C5C"/>
  </svg>
);

// 球衣号码图标
export const JerseyNumberIcon = ({ number, className = "w-8 h-8" }: { number: string | number; className?: string }) => (
  <div className={`${className} rounded-full bg-city-blue-300 text-white flex items-center justify-center font-bold text-sm`}>
    {number}
  </div>
);

// 队长袖标图标
export const CaptainBandIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="10" width="18" height="4" rx="2" fill="#FFD700"/>
    <text x="12" y="13.5" textAnchor="middle" fill="#1C2C5C" fontSize="8" fontWeight="bold">C</text>
    <path d="M3 12L7 8V16L3 12Z" fill="#FFD700"/>
    <path d="M21 12L17 8V16L21 12Z" fill="#FFD700"/>
  </svg>
);

// 战术板图标
export const TacticsBoardIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="16" rx="2" fill="#4CAF50" stroke="#2E7D32" strokeWidth="2"/>
    <circle cx="8" cy="10" r="1.5" fill="#6CABDD"/>
    <circle cx="12" cy="8" r="1.5" fill="#6CABDD"/>
    <circle cx="16" cy="10" r="1.5" fill="#6CABDD"/>
    <circle cx="12" cy="12" r="1.5" fill="#6CABDD"/>
    <path d="M8 10L12 8L16 10" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2,2"/>
    <path d="M8 10L12 12L16 10" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2,2"/>
    <rect x="6" y="18" width="12" height="3" rx="1" fill="#8D6E63"/>
  </svg>
); 