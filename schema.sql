-- KNK Salon Awadh - Database Schema
-- Database: knk_awadh

CREATE DATABASE IF NOT EXISTS knk_awadh CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE knk_awadh;

-- 1. Users Table (Admin authentication)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Heroes Table (Homepage hero banner CMS)
CREATE TABLE IF NOT EXISTS heroes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    media_url VARCHAR(255) NOT NULL,
    media_type VARCHAR(20) DEFAULT 'image',
    alt_text VARCHAR(255) NOT NULL,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Service Categories Table (Services CMS)
CREATE TABLE IF NOT EXISTS service_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    title VARCHAR(255) NULL,
    short_desc TEXT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    is_active TINYINT(1) DEFAULT 1,
    deleted_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Bookings Table (Client leads, concierge, bridal, and academy appointments)
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    form_type VARCHAR(50) NOT NULL,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(150) NULL,
    service_or_course VARCHAR(150) NULL,
    branch_location VARCHAR(100) NULL,
    booking_date VARCHAR(50) NULL,
    booking_time VARCHAR(50) NULL,
    guests INT DEFAULT 1,
    city VARCHAR(100) NULL,
    message TEXT NULL,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    ip_address VARCHAR(45) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Blogs Table (Editorial stories, beauty guides, bridal tips)
CREATE TABLE IF NOT EXISTS blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content LONGTEXT NOT NULL,
    cover_image VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    author VARCHAR(100) DEFAULT 'KNK Editorial Team',
    read_time VARCHAR(50) DEFAULT '4 min read',
    tags VARCHAR(255) NULL,
    is_published TINYINT(1) DEFAULT 1,
    views_count INT DEFAULT 0,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Master SEO Metadata Table (URL-targeted meta tags & OG images)
CREATE TABLE IF NOT EXISTS seo_metadata (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_path VARCHAR(255) NOT NULL UNIQUE,
    page_name VARCHAR(150) NOT NULL,
    meta_title VARCHAR(255) NOT NULL,
    meta_description TEXT NOT NULL,
    meta_keywords TEXT NULL,
    og_image VARCHAR(255) NULL,
    canonical_url VARCHAR(255) NULL,
    robots VARCHAR(100) DEFAULT 'index, follow',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Services Table (Dynamic individual services under categories)
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NULL,
    category_name VARCHAR(100) NOT NULL,
    category_slug VARCHAR(100) NOT NULL,
    name VARCHAR(150) NOT NULL,
    title VARCHAR(255) NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    short_desc TEXT NULL,
    description LONGTEXT NULL,
    image VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 1,
    tags TEXT NULL,
    filter_category VARCHAR(100) NULL,
    price VARCHAR(100) DEFAULT 'On request',
    is_active TINYINT(1) DEFAULT 1,
    deleted_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category_slug (category_slug),
    INDEX idx_slug (slug),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

