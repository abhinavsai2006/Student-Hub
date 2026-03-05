import { AgendaItem, Transaction, CampusEvent, AttendanceRecord, MenuItem, CafeItem, Machine, Route, Expense, StudyGroup, ForumPost, Appointment, WellnessCard, MarketplaceItem } from '@/types';

export const agendaItems: AgendaItem[] = [
    { time: '10:30 AM', title: 'Operating Systems Lecture', location: 'LHC-102', type: 'Academic' },
    { time: '01:00 PM', title: 'Mess Committee Meeting', location: 'Central Mess', type: 'Activity' },
    { time: '02:30 PM', title: 'Database Systems Lab', location: 'CS-Lab 2', type: 'Academic' },
    { time: '05:00 PM', title: 'Football Practice', location: 'Main Field', type: 'Leisure' },
];

export const transactions: Transaction[] = [
    { title: 'Mess Rebate', date: 'Yesterday', amount: '+ ₹120.00', type: 'credit' },
    { title: 'Laundry Charge', date: '24 Oct', amount: '- ₹25.00', type: 'debit' },
    { title: 'Cafe Order', date: '23 Oct', amount: '- ₹180.00', type: 'debit' },
    { title: 'Wallet Top-up', date: '22 Oct', amount: '+ ₹1,000.00', type: 'credit' },
];

export const campusEvents: CampusEvent[] = [
    { id: '1', title: 'Hackathon 2024 Registration', date: '2024-11-15', month: 'NOV', day: '15', type: 'Competition' },
    { id: '2', title: 'Mid-Term Viva - CS Block', date: '2024-11-18', month: 'NOV', day: '18', type: 'Academic' },
    { id: '3', title: 'Diwali Fest Planning', date: '2024-11-20', month: 'NOV', day: '20', type: 'Cultural' },
    { id: '4', title: 'Guest Lecture: AI in Finance', date: '2024-11-22', month: 'NOV', day: '22', type: 'Event' },
];

export const attendanceData: AttendanceRecord[] = [
    { subject: 'Algorithms', code: 'CS301', attended: 34, total: 40, percentage: 84 },
    { subject: 'Computer Net.', code: 'CS302', attended: 29, total: 40, percentage: 72 },
    { subject: 'Soft. Eng.', code: 'CS303', attended: 37, total: 40, percentage: 92 },
    { subject: 'Microproc.', code: 'CS304', attended: 26, total: 40, percentage: 65 },
];

export const messMenuItems: MenuItem[] = [
    {
        id: '1', name: 'Paneer Butter Masala', description: 'Creamy tomato-based gravy with soft cottage',
        image: '/food/paneer.jpg', calories: 320, rating: 4.9, reviews: 124, tags: ['Bestseller', 'Dairy'], type: 'main'
    },
    {
        id: '2', name: 'Jeera Rice & Dal Tadka', description: 'Fragrant cumin rice paired with tempered',
        image: '/food/dal.jpg', calories: 280, rating: 4.5, tags: ['Comfort Food', 'Vegan'], type: 'main'
    },
    {
        id: '3', name: 'Mixed Vegetable Raita', description: 'Chilled yogurt with finely chopped',
        image: '/food/raita.jpg', calories: 80, rating: 4.3, tags: ['Probiotic', 'Cooling'], type: 'side'
    },
];

export const cafeItems: CafeItem[] = [
    { id: '1', name: 'Classic Paneer Tikka', description: 'Grilled sandwich stuffed with spiced paneer and mint chutney.', image: '/food/paneer-tikka.jpg', price: 120, calories: 320, prepTime: 12, tags: ['Popular'], isVeg: true },
    { id: '2', name: 'Double Shot Espresso', description: 'Rich and robust coffee brewed with premium Arabica beans.', image: '/food/espresso.jpg', price: 85, calories: 5, prepTime: 5, tags: [], isVeg: true },
    { id: '3', name: 'Butter Chicken Rice', description: 'Creamy butter chicken served over fragrant basmati rice.', image: '/food/butter-chicken.jpg', price: 180, calories: 380, prepTime: 15, tags: ['Popular'], isVeg: false, isNonVeg: true },
    { id: '4', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a gooey molten center.', image: '/food/lava-cake.jpg', price: 95, calories: 450, prepTime: 10, tags: [], isVeg: true },
    { id: '5', name: 'Veg Hakka Noodles', description: 'Stir-fried noodles with crisp vegetables and soy sauce.', image: '/food/noodles.jpg', price: 110, calories: 380, prepTime: 12, tags: [], isVeg: true },
    { id: '6', name: 'Iced Caramel', description: 'Cold espresso with vanilla syrup, milk, and caramel drizzle.', image: '/food/iced-caramel.jpg', price: 140, calories: 210, prepTime: 8, tags: ['Popular'], isVeg: true },
    { id: '7', name: 'Peri Peri Fries', description: 'Crispy golden fries tossed in spicy peri peri seasoning.', image: '/food/fries.jpg', price: 75, calories: 280, prepTime: 8, tags: [], isVeg: true },
    { id: '8', name: 'Greek Salad Bowl', description: 'Fresh cucumbers, tomatoes, olives, and feta cheese.', image: '/food/salad.jpg', price: 155, calories: 160, prepTime: 10, tags: [], isVeg: true },
];

export const machines: Machine[] = [
    { id: 'W-01', name: 'W-01', type: 'Washer', status: 'Available' },
    { id: 'W-02', name: 'W-02', type: 'Washer', status: 'In Use', timeLeft: '23 mins', progress: 65 },
    { id: 'W-03', name: 'W-03', type: 'Washer', status: 'Offline' },
    { id: 'W-04', name: 'W-04', type: 'Washer', status: 'Finishing', timeLeft: '8 mins', progress: 88 },
    { id: 'D-01', name: 'D-01', type: 'Dryer', status: 'Available' },
    { id: 'D-02', name: 'D-02', type: 'Dryer', status: 'In Use', timeLeft: '14 mins', progress: 72 },
];

export const busRoutes: Route[] = [
    { id: '1', name: 'Route 42', from: 'Main Gate', to: 'Block H', eta: '8 mins', status: 'On Time', crowd: 'Low Crowd', nextBus: '10:45 AM' },
    { id: '2', name: 'Route 15', from: 'Academic Block', to: 'Hostel Zone', eta: '15 mins', status: 'On Time', crowd: 'Moderate', nextBus: '11:00 AM' },
    { id: '3', name: 'Route 7', from: 'Sports Complex', to: 'Library', eta: '5 mins', status: 'Delayed', crowd: 'Crowded', nextBus: '10:35 AM' },
    { id: '4', name: 'Route 23', from: 'Admin Block', to: 'Canteen', eta: '12 mins', status: 'On Time', crowd: 'Low Crowd', nextBus: '10:50 AM' },
];

export const expenses: Expense[] = [
    { id: '1', title: 'Pizza Night', amount: 1200, date: '24 Oct', category: 'Food', splitWith: ['Rahul', 'Priya', 'Amit'], paidBy: 'You' },
    { id: '2', title: 'Uber Ride', amount: 350, date: '23 Oct', category: 'Transport', splitWith: ['Rahul'], paidBy: 'Rahul' },
    { id: '3', title: 'Movie Tickets', amount: 800, date: '22 Oct', category: 'Entertainment', splitWith: ['Priya', 'Amit'], paidBy: 'You' },
    { id: '4', title: 'Stationery', amount: 450, date: '21 Oct', category: 'Academic', splitWith: [], paidBy: 'You' },
];

export const marketplaceItems: MarketplaceItem[] = [
    { id: '1', title: 'TI-84 Calculator', price: 2500, image: '/marketplace/calculator.jpg', seller: 'Rahul K.', condition: 'Like New', category: 'Electronics' },
    { id: '2', title: 'Data Structures Textbook', price: 350, image: '/marketplace/textbook.jpg', seller: 'Priya S.', condition: 'Good', category: 'Books' },
    { id: '3', title: 'Desk Lamp', price: 800, image: '/marketplace/lamp.jpg', seller: 'Amit V.', condition: 'New', category: 'Furniture' },
    { id: '4', title: 'Lab Coat (M)', price: 200, image: '/marketplace/labcoat.jpg', seller: 'Sneha R.', condition: 'Good', category: 'Clothing' },
];

export const studyGroups: StudyGroup[] = [
    { id: '1', name: 'Algorithm Masters', members: 12, subject: 'CS301 - Algorithms', nextSession: 'Today, 4 PM', avatar: '🧮' },
    { id: '2', name: 'Database Warriors', members: 8, subject: 'CS302 - DBMS', nextSession: 'Tomorrow, 2 PM', avatar: '🗄️' },
    { id: '3', name: 'Network Ninjas', members: 15, subject: 'CS303 - Networks', nextSession: 'Wed, 3 PM', avatar: '🌐' },
    { id: '4', name: 'OS Explorers', members: 10, subject: 'CS304 - Operating Systems', nextSession: 'Thu, 5 PM', avatar: '💻' },
];

export const forumPosts: ForumPost[] = [
    { id: '1', title: 'Tips for Mid-Term Preparation', author: 'Priya Sharma', content: 'Hey everyone! Sharing some useful tips for upcoming mid-terms...', likes: 24, replies: 8, time: '2h ago', tags: ['Academic', 'Tips'] },
    { id: '2', title: 'Lost: Blue Water Bottle in LHC', author: 'Amit Kumar', content: 'I lost my blue Nalgene water bottle in LHC-102 today during the OS lecture...', likes: 5, replies: 3, time: '4h ago', tags: ['Lost & Found'] },
    { id: '3', title: 'Weekend Football Match', author: 'Rahul Verma', content: 'Organizing a friendly football match this Saturday at Main Field...', likes: 18, replies: 12, time: '6h ago', tags: ['Sports', 'Weekend'] },
];

export const appointments: Appointment[] = [
    { id: '1', doctor: 'Dr. Meera Singh', speciality: 'General Physician', date: 'Oct 28, 2024', time: '10:00 AM', status: 'Upcoming' },
    { id: '2', doctor: 'Dr. Rajesh Kumar', speciality: 'Dermatologist', date: 'Oct 25, 2024', time: '2:30 PM', status: 'Completed' },
    { id: '3', doctor: 'Dr. Anita Desai', speciality: 'Counsellor', date: 'Oct 30, 2024', time: '11:00 AM', status: 'Upcoming' },
];

export const wellnessCards: WellnessCard[] = [
    { title: 'Mental Health', description: 'Access counselling services and mental health resources.', icon: '🧠', color: 'bg-purple-50 border-purple-200' },
    { title: 'Fitness Tracking', description: 'Track your daily steps, workout and activity goals.', icon: '🏃', color: 'bg-green-50 border-green-200' },
    { title: 'Sleep Quality', description: 'Monitor and improve your sleep patterns.', icon: '😴', color: 'bg-blue-50 border-blue-200' },
    { title: 'Nutrition Guide', description: 'Personalized meal plans and dietary advice.', icon: '🥗', color: 'bg-orange-50 border-orange-200' },
];

export const timetableData = [
    {
        day: 'Monday', slots: [
            { time: '9:00 AM', subject: 'Algorithms', room: 'LHC-101', type: 'Lecture' as const },
            { time: '11:00 AM', subject: 'Computer Networks', room: 'LHC-203', type: 'Lecture' as const },
            { time: '2:00 PM', subject: 'Software Eng. Lab', room: 'CS-Lab 1', type: 'Lab' as const },
        ]
    },
    {
        day: 'Tuesday', slots: [
            { time: '9:00 AM', subject: 'Operating Systems', room: 'LHC-102', type: 'Lecture' as const },
            { time: '11:00 AM', subject: 'Microprocessors', room: 'LHC-305', type: 'Lecture' as const },
            { time: '3:00 PM', subject: 'Algorithms Tutorial', room: 'T-201', type: 'Tutorial' as const },
        ]
    },
    {
        day: 'Wednesday', slots: [
            { time: '10:00 AM', subject: 'Database Systems', room: 'LHC-104', type: 'Lecture' as const },
            { time: '12:00 PM', subject: 'Computer Networks Lab', room: 'CN-Lab', type: 'Lab' as const },
            { time: '3:00 PM', subject: 'Soft. Eng.', room: 'LHC-201', type: 'Lecture' as const },
        ]
    },
    {
        day: 'Thursday', slots: [
            { time: '9:00 AM', subject: 'Algorithms', room: 'LHC-101', type: 'Lecture' as const },
            { time: '11:00 AM', subject: 'Operating Systems', room: 'LHC-102', type: 'Lecture' as const },
            { time: '2:00 PM', subject: 'Microprocessors Lab', room: 'MP-Lab', type: 'Lab' as const },
        ]
    },
    {
        day: 'Friday', slots: [
            { time: '9:00 AM', subject: 'Database Systems', room: 'LHC-104', type: 'Lecture' as const },
            { time: '11:00 AM', subject: 'Soft. Eng.', room: 'LHC-201', type: 'Lecture' as const },
            { time: '2:00 PM', subject: 'OS Tutorial', room: 'T-102', type: 'Tutorial' as const },
        ]
    },
];

export const expenseChartData = [
    { month: 'Jul', food: 4200, transport: 800, entertainment: 1200, academic: 600 },
    { month: 'Aug', food: 3800, transport: 1200, entertainment: 900, academic: 1500 },
    { month: 'Sep', food: 4500, transport: 600, entertainment: 1800, academic: 400 },
    { month: 'Oct', food: 4100, transport: 900, entertainment: 1100, academic: 800 },
];
