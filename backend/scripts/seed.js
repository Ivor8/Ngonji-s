const mongoose = require('mongoose');
const Service = require('../models/Service');
const Portfolio = require('../models/Portfolio');
const Testimonial = require('../models/Testimonial');
require('dotenv').config();

// Sample data
const sampleServices = [
  // Law Firm Services
  {
    entity: 'law',
    title: 'Corporate Law',
    description: 'Comprehensive legal services for businesses including incorporation, contracts, compliance, and corporate governance.',
    icon: 'building',
    is_active: true,
    sort_order: 1
  },
  {
    entity: 'law',
    title: 'Family Law',
    description: 'Expert legal guidance for family matters including divorce, child custody, adoption, and estate planning.',
    icon: 'heart',
    is_active: true,
    sort_order: 2
  },
  {
    entity: 'law',
    title: 'Criminal Defense',
    description: 'Aggressive legal representation for criminal cases, ensuring your rights are protected throughout the legal process.',
    icon: 'shield',
    is_active: true,
    sort_order: 3
  },
  
  // Real Estate Services
  {
    entity: 'realestate',
    title: 'Property Development',
    description: 'End-to-end property development services from land acquisition to construction and project management.',
    icon: 'crane',
    is_active: true,
    sort_order: 1
  },
  {
    entity: 'realestate',
    title: 'Property Sales',
    description: 'Professional real estate brokerage services for buying and selling residential and commercial properties.',
    icon: 'home',
    is_active: true,
    sort_order: 2
  },
  {
    entity: 'realestate',
    title: 'Property Management',
    description: 'Comprehensive property management services including tenant screening, maintenance, and rent collection.',
    icon: 'key',
    is_active: true,
    sort_order: 3
  },
  
  // Foundation Services
  {
    entity: 'foundation',
    title: 'Education Programs',
    description: 'Educational initiatives providing scholarships, tutoring, and learning resources to underserved communities.',
    icon: 'book',
    is_active: true,
    sort_order: 1
  },
  {
    entity: 'foundation',
    title: 'Healthcare Initiatives',
    description: 'Health programs providing medical care, health education, and wellness services to communities in need.',
    icon: 'medical',
    is_active: true,
    sort_order: 2
  },
  {
    entity: 'foundation',
    title: 'Community Development',
    description: 'Projects focused on infrastructure development, clean water, and sustainable community growth.',
    icon: 'users',
    is_active: true,
    sort_order: 3
  },
  
  // Credit Services
  {
    entity: 'credit',
    title: 'Mortgage Loans',
    description: 'Competitive mortgage financing for home purchases with flexible terms and competitive interest rates.',
    icon: 'house',
    is_active: true,
    sort_order: 1
  },
  {
    entity: 'credit',
    title: 'Construction Loans',
    description: 'Financing solutions for construction projects including residential, commercial, and industrial developments.',
    icon: 'hammer',
    is_active: true,
    sort_order: 2
  },
  {
    entity: 'credit',
    title: 'Property Investment',
    description: 'Investment financing for property acquisitions and development projects with favorable terms.',
    icon: 'chart',
    is_active: true,
    sort_order: 3
  }
];

const sampleTestimonials = [
  // Law Firm Testimonials
  {
    entity: 'law',
    client_name: 'John Smith',
    client_title: 'CEO, Tech Company',
    content: 'Outstanding legal service! The team handled our corporate restructuring with professionalism and expertise.',
    rating: 5,
    is_active: true
  },
  {
    entity: 'law',
    client_name: 'Sarah Johnson',
    client_title: 'Client',
    content: 'Compassionate and knowledgeable. They guided me through a difficult family law matter with care.',
    rating: 5,
    is_active: true
  },
  
  // Real Estate Testimonials
  {
    entity: 'realestate',
    client_name: 'Michael Brown',
    client_title: 'Property Investor',
    content: 'Excellent service from start to finish. Found the perfect investment property and handled all negotiations.',
    rating: 5,
    is_active: true
  },
  
  // Foundation Testimonials (these won't be displayed since we show team instead)
  {
    entity: 'foundation',
    client_name: 'Community Leader',
    client_title: 'Local NGO',
    content: 'The foundation\'s education program has transformed our community. Thank you for your dedication.',
    rating: 5,
    is_active: false
  },
  
  // Credit Testimonials
  {
    entity: 'credit',
    client_name: 'David Wilson',
    client_title: 'Homeowner',
    content: 'Smooth and efficient mortgage process. Got a great rate and excellent service throughout.',
    rating: 5,
    is_active: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Service.deleteMany({});
    await Testimonial.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Insert sample data
    await Service.insertMany(sampleServices);
    await Testimonial.insertMany(sampleTestimonials);
    console.log('📊 Sample data inserted successfully');

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
