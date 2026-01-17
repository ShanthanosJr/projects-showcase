export interface Project {
    id: string;
    title: string;
    type: string;
    stack: string[];
    database?: string;
    description: string;
    repoType: 'Public' | 'Private' | 'Design-only';
    repoUrl?: string; // If you have public links, add them here
    status: 'Completed' | 'In Progress' | 'On Hold';
    assets: {
        images: string[];
        video?: string;
    };
    features?: string[];
}

export const projects: Project[] = [
    {
        id: 'wfs-engineering',
        title: 'Smart Construction Workflow & Safety Management System',
        type: 'Web Application (MERN)',
        stack: ['React', 'Node.js', 'Express.js', 'MongoDB'],
        database: 'MongoDB',
        description: 'A smart construction management system to manage workflows, safety processes, timelines, and dashboards. The system supports structured project monitoring and operational visibility across construction activities.',
        repoType: 'Public',
        status: 'Completed',
        assets: {
            images: [
                '/assets/wfs-engineering/wfseng_1.png',
                '/assets/wfs-engineering/wfseng_2.png',
                '/assets/wfs-engineering/wfseng_3.png',
                '/assets/wfs-engineering/wfseng_4.png',
                '/assets/wfs-engineering/wfseng_5.png',
                '/assets/wfs-engineering/wfseng_6.png',
                '/assets/wfs-engineering/wfseng_7.png',
                '/assets/wfs-engineering/wfseng_8.png',
                '/assets/wfs-engineering/wfseng_9.png',
                '/assets/wfs-engineering/wfseng_10.png',
                '/assets/wfs-engineering/wfseng_11.png',
                '/assets/wfs-engineering/wfseng_12.png',
                '/assets/wfs-engineering/wfseng_13.png',
                '/assets/wfs-engineering/wfseng_14.png',
                '/assets/wfs-engineering/wfseng_15.png',
                '/assets/wfs-engineering/wfseng_16.png',
            ],
            video: '/assets/wfs-engineering/notification.mp4'
        }
    },
    {
        id: 'auram',
        title: 'Auram – Jewelry E-Commerce',
        type: 'Frontend Web Application',
        stack: ['React', 'Vite', 'Tailwind CSS'],
        description: 'A modern e-commerce frontend focused on product browsing, inventory display, and responsive UI design for a jewelry brand.',
        repoType: 'Private',
        status: 'Completed',
        assets: {
            images: [
                '/assets/auram/auram_1.png',
                '/assets/auram/auram_2.png',
                '/assets/auram/auram_3.png',
                '/assets/auram/auram_4.png',
            ],
            video: '/assets/auram/Auram.mp4'
        }
    },
    {
        id: 'hotelmania',
        title: 'HotelMania',
        type: 'Web Application',
        stack: ['React', 'Vite', 'Tailwind CSS', 'MongoDB'],
        description: 'A hotel management system for handling tour packages, bookings, schedules, and customer interactions through a modern web interface.',
        repoType: 'Private',
        status: 'Completed',
        assets: {
            images: [
                '/assets/hotelmania/hotelmania_1.png',
                '/assets/hotelmania/hotelmania_2.png',
                '/assets/hotelmania/hotelmania_3.png',
                '/assets/hotelmania/hotelmania_4.png',
                '/assets/hotelmania/hotelmania_5.png',
                '/assets/hotelmania/hotelmania_6.png',
            ],
            video: '/assets/hotelmania/HotelMania_Home.mp4'
        }
    },
    {
        id: 'rentalday',
        title: 'RentalDay',
        type: 'Web Application',
        stack: ['React', 'Vite', 'MongoDB'],
        description: 'A vehicle rental management platform supporting vehicle listings, availability tracking, and rental workflows.',
        repoType: 'Private',
        status: 'Completed',
        assets: {
            images: [
                '/assets/rentalday/rd_1.png',
                '/assets/rentalday/rd_2.png',
                '/assets/rentalday/rd_3.png',
                '/assets/rentalday/rd_4.png',
                '/assets/rentalday/rd_5.png',
                '/assets/rentalday/rd_6.png',
                '/assets/rentalday/rd_7.png',
            ],
            video: '/assets/rentalday/RentalDay_Home_2.mp4'
        }
    },
    {
        id: 'tourday',
        title: 'TourDay',
        type: 'Web Application',
        stack: ['React', 'Vite', 'MongoDB'],
        description: 'A tour management platform designed to handle tour packages, customer bookings, and travel schedules with a clean and responsive frontend.',
        repoType: 'Private',
        status: 'Completed',
        assets: {
            images: [
                '/assets/tourday/td_1.png',
                '/assets/tourday/td_2.png',
                '/assets/tourday/td_3.png',
                '/assets/tourday/td_4.png',
                '/assets/tourday/td_5.png',
                '/assets/tourday/td_6.png',
            ],
            video: '/assets/tourday/TourDay.mp4'
        }
    },
    {
        id: 'mindofmine',
        title: 'Mood Tracker (MindOfMine)',
        type: 'Mobile Application',
        stack: ['Kotlin', 'SQLite'],
        database: 'SQLite',
        description: 'A mobile application designed to log daily moods and analyze emotional patterns, supporting self-reflection and mental wellness tracking.',
        repoType: 'Private',
        status: 'Completed',
        assets: {
            images: [
                '/assets/mindofmine/mom_1.png',
                '/assets/mindofmine/mom_2.png',
                '/assets/mindofmine/mom_3.png',
                '/assets/mindofmine/mom_4.png',
                '/assets/mindofmine/mom_5.png',
                '/assets/mindofmine/mom_6.png',
                '/assets/mindofmine/mom_7.png',
                '/assets/mindofmine/mom_8.png',
                '/assets/mindofmine/mom_9.png',
                '/assets/mindofmine/mom_10.png',
                '/assets/mindofmine/mom_11.png',
                '/assets/mindofmine/mom_12.png',
                '/assets/mindofmine/mom_13.png',
                '/assets/mindofmine/mom_14.png',
                '/assets/mindofmine/mom_15.png',
                '/assets/mindofmine/mom_16.png',
                '/assets/mindofmine/mom_17.png',
                '/assets/mindofmine/mom_18.png',
                '/assets/mindofmine/mom_19.png',
                '/assets/mindofmine/mom_20.png',
                '/assets/mindofmine/mom_21.png',
                '/assets/mindofmine/mom_22.png',
                '/assets/mindofmine/mom_23.png',
            ]
            // No video found for MindOfMine
        }
    },
    {
        id: 'logistics-corp',
        title: 'Logistics Dashboard',
        type: 'Web Application',
        stack: ['React', 'Full Stack?'],
        description: 'A logistics and supply chain management dashboard.',
        repoType: 'Private',
        status: 'Completed',
        assets: {
            images: [
                '/assets/logistics-corp/lc_1.png',
                '/assets/logistics-corp/lc_2.png',
                '/assets/logistics-corp/lc_3.png',
            ],
            video: '/assets/logistics-corp/Logistics_Dashboard.mp4'
        }
    }
];

export const socialLinks = {
    github: 'https://github.com/ShanthanosJr',
    linkedin: 'https://www.linkedin.com/in/kavishka-ranamukage-4869663a5',
    portfolio: 'https://portfolio-2-0-nine-green.vercel.app/'
};

export const aboutMe = {
    name: 'Kavishka Ranamukage',
    title: 'IT Undergraduate | Full Stack Developer',
    description: "I am an undergraduate student in the BSc (Hons) in Information Technology program at SLIIT. My work spans full-stack web development, mobile application development, and UI/UX design, with a strong focus on clean architecture, scalability, and real-world problem solving.",
    skills: {
        languages: ['JavaScript', 'TypeScript', 'Java', 'Kotlin', 'Python', 'C', 'C++', 'PHP'],
        frontend: ['React', 'React Native', 'Vite', 'Tailwind CSS', 'Next.js'],
        backend: ['Node.js', 'Express.js', 'Spring Boot'],
        database: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQLite'],
        tools: ['Git', 'Docker', 'Figma', 'Postman']
    }
};
