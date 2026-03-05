// Dashboard Types
export interface DashboardCard {
    title: string;
    value: string;
    subtitle: string;
    icon: string;
    trend?: string;
}

export interface AgendaItem {
    time: string;
    title: string;
    location: string;
    type: 'Academic' | 'Activity' | 'Leisure' | 'Event';
}

export interface Transaction {
    title: string;
    date: string;
    amount: string;
    type: 'credit' | 'debit';
}

export interface BusRoute {
    route: string;
    gate: string;
    eta: string;
    crowd: 'Low Crowd' | 'Moderate' | 'Crowded';
}

// Mess & Food Types
export interface MenuItem {
    id: string;
    name: string;
    description: string;
    image: string;
    calories: number;
    rating: number;
    reviews?: number;
    tags: string[];
    type: 'main' | 'accompaniment' | 'side';
}

export interface CafeItem {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    calories: number;
    prepTime: number;
    tags: string[];
    isVeg: boolean;
    isPopular?: boolean;
    isNonVeg?: boolean;
}

export interface NutritionInfo {
    totalCalories: number;
    protein: number;
    carbs: number;
    healthyFats: number;
}

// Laundry Types
export interface Machine {
    id: string;
    name: string;
    type: 'Washer' | 'Dryer';
    status: 'Available' | 'In Use' | 'Finishing' | 'Offline';
    timeLeft?: string;
    progress?: number;
}

export interface LaundryBooking {
    date: string;
    time: string;
    duration: string;
    fee: number;
    machine: string;
}

// Study Types
export interface TimetableEntry {
    day: string;
    time: string;
    subject: string;
    room: string;
    type: 'Lecture' | 'Lab' | 'Tutorial';
}

export interface AttendanceRecord {
    subject: string;
    code: string;
    attended: number;
    total: number;
    percentage: number;
}

export interface StudyResource {
    id: string;
    name: string;
    type: 'pdf' | 'video' | 'folder' | 'doc';
    size?: string;
    date?: string;
    children?: StudyResource[];
}

// Transport Types
export interface Route {
    id: string;
    name: string;
    from: string;
    to: string;
    eta: string;
    status: 'On Time' | 'Delayed' | 'Cancelled';
    crowd: 'Low Crowd' | 'Moderate' | 'Crowded';
    nextBus: string;
}

// Finance Types
export interface Expense {
    id: string;
    title: string;
    amount: number;
    date: string;
    category: string;
    splitWith?: string[];
    paidBy: string;
}

export interface MarketplaceItem {
    id: string;
    title: string;
    price: number;
    image: string;
    seller: string;
    condition: string;
    category: string;
}

// Community Types
export interface ChatMessage {
    id: string;
    sender: string;
    message: string;
    time: string;
    avatar: string;
    isOwn?: boolean;
}

export interface StudyGroup {
    id: string;
    name: string;
    members: number;
    subject: string;
    nextSession: string;
    avatar: string;
}

export interface ForumPost {
    id: string;
    title: string;
    author: string;
    content: string;
    likes: number;
    replies: number;
    time: string;
    tags: string[];
}

// Health Types
export interface Appointment {
    id: string;
    doctor: string;
    speciality: string;
    date: string;
    time: string;
    status: 'Upcoming' | 'Completed' | 'Cancelled';
}

export interface WellnessCard {
    title: string;
    description: string;
    icon: string;
    color: string;
}

// Campus Calendar
export interface CampusEvent {
    id: string;
    title: string;
    date: string;
    month: string;
    day: string;
    type: 'Competition' | 'Academic' | 'Cultural' | 'Event';
}

// Navigation
export interface NavItem {
    label: string;
    href: string;
    icon: string;
}
