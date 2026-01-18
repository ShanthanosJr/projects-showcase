import React from 'react';
import { motion } from 'framer-motion';

export const ArchitectureDiagram: React.FC = () => {
    return (
        <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-black/20 rounded-xl border border-white/5 p-8 relative overflow-hidden group">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

            <svg
                viewBox="0 0 800 400"
                className="w-full h-full max-w-2xl drop-shadow-2xl"
                style={{ overflow: 'visible' }}
            >
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#a855f7" />
                    </marker>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Connections */}
                <motion.path
                    d="M150 200 L 250 200"
                    stroke="#a855f7"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.path
                    d="M380 200 L 480 200"
                    stroke="#a855f7"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                />
                <motion.path
                    d="M620 200 L 700 200"
                    stroke="#a855f7"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                />

                {/* Node: User */}
                <g className="cursor-pointer hover:opacity-80 transition-opacity">
                    <circle cx="100" cy="200" r="40" fill="#1e1e1e" stroke="#a855f7" strokeWidth="2" />
                    <text x="100" y="205" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">User</text>
                </g>

                {/* Node: Client */}
                <g className="cursor-pointer hover:opacity-80 transition-opacity">
                    <rect x="250" y="160" width="130" height="80" rx="10" fill="#0f0f0f" stroke="#3b82f6" strokeWidth="2" />
                    <text x="315" y="200" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Client (React)</text>
                    <text x="315" y="220" textAnchor="middle" fill="#9ca3af" fontSize="10">SPA / Frontend</text>
                </g>

                {/* Node: Server */}
                <g className="cursor-pointer hover:opacity-80 transition-opacity">
                    <rect x="480" y="160" width="140" height="80" rx="10" fill="#0f0f0f" stroke="#10b981" strokeWidth="2" />
                    <text x="550" y="195" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Server / API</text>
                    <text x="550" y="215" textAnchor="middle" fill="#9ca3af" fontSize="10">Node.js / Python</text>
                </g>

                {/* Node: Database */}
                <g className="cursor-pointer hover:opacity-80 transition-opacity">
                    <path d="M700 160 C 730 160, 750 170, 750 180 V 220 C 750 230, 730 240, 700 240 C 670 240, 650 230, 650 220 V 180 C 650 170, 670 160, 700 160" fill="#0f0f0f" stroke="#f59e0b" strokeWidth="2" />
                    <ellipse cx="700" cy="180" rx="50" ry="10" fill="none" stroke="#f59e0b" strokeWidth="2" />
                    <text x="700" y="205" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Database</text>
                    <text x="700" y="225" textAnchor="middle" fill="#9ca3af" fontSize="10">SQL / NoSQL</text>
                </g>
            </svg>

            <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-black/50 px-2 py-1 rounded backdrop-blur border border-white/5">
                Generic Architecture Flow
            </div>
        </div>
    );
};
