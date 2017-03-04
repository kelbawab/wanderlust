-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 03, 2017 at 03:26 PM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `Wanderlust`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE IF NOT EXISTS `activity` (
`id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `logo` varchar(200) NOT NULL,
  `optional1` varchar(150) NOT NULL,
  `optional2` varchar(200) NOT NULL,
  `optional3` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`id`, `name`, `description`, `logo`, `optional1`, `optional2`, `optional3`, `created_at`, `updated_at`) VALUES
(1, 'Hiking', 'Hiking', 'Hiking.png', '', '', '', '0000-00-00 00:00:00', '2017-03-03 11:53:03'),
(2, 'Backpacking', 'Backpacking', 'Backpacking.png', '', '', '', '0000-00-00 00:00:00', '2017-03-03 11:50:01'),
(3, 'Adventure', 'Adventure', 'adventure.png', '', '', '', '2017-02-26 16:02:49', '2017-03-03 11:59:37'),
(4, 'Diving', 'Diving', 'Diving.png', '', '', '', '2017-02-26 16:02:49', '2017-03-03 11:50:30'),
(5, 'Chatting', 'Chatting', 'Chatting.png', '', '', '', '0000-00-00 00:00:00', '2017-03-03 11:51:33'),
(6, 'Camping', 'Camping', 'Camping.png', '', '', '', '0000-00-00 00:00:00', '2017-03-03 11:51:33'),
(7, 'Cycling', 'Cycling', 'Cycling.png', '', '', '', '0000-00-00 00:00:00', '2017-03-03 11:52:25'),
(8, 'Yoga', 'Yoga', 'Yoga.png', '', '', '', '0000-00-00 00:00:00', '2017-03-03 11:52:48');

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE IF NOT EXISTS `city` (
`id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `photo` varchar(200) NOT NULL,
  `country_id` int(11) NOT NULL,
  `optional1` varchar(150) NOT NULL,
  `optional2` varchar(200) NOT NULL,
  `optional3` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`id`, `name`, `photo`, `country_id`, `optional1`, `optional2`, `optional3`, `created_at`, `updated_at`) VALUES
(1, 'Cairo Governorate', '', 1, '', '', '', '0000-00-00 00:00:00', '2017-03-03 13:03:25'),
(2, 'Giza Governorate', '', 1, '', '', '', '0000-00-00 00:00:00', '2017-03-03 13:03:27');

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE IF NOT EXISTS `country` (
`id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `short_name` varchar(30) NOT NULL,
  `citizen_name` varchar(30) NOT NULL,
  `flag_image` varchar(200) NOT NULL,
  `optional1` varchar(150) NOT NULL,
  `optional2` varchar(200) NOT NULL,
  `optional3` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE IF NOT EXISTS `status` (
`id` int(11) NOT NULL,
  `description` varchar(20) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `description`) VALUES
(1, 'add'),
(2, 'remove');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
`id` int(11) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `country_id` int(11) NOT NULL,
  `birth_date` date NOT NULL,
  `about` text NOT NULL,
  `discoverable` tinyint(1) NOT NULL,
  `radius` int(11) NOT NULL,
  `show_distance` tinyint(1) NOT NULL,
  `current_city_id` int(11) NOT NULL,
  `current_longtitude` float(10,6) NOT NULL,
  `current_latitude` float(10,6) NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  `facebook_id` text NOT NULL,
  `image_url` varchar(400) NOT NULL,
  `cover_image_url` varchar(400) NOT NULL,
  `mobile_first` int(11) NOT NULL DEFAULT '1',
  `optional1` varchar(150) NOT NULL,
  `optional2` varchar(250) NOT NULL,
  `optional3` varchar(300) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `country_id`, `birth_date`, `about`, `discoverable`, `radius`, `show_distance`, `current_city_id`, `current_longtitude`, `current_latitude`, `deleted`, `facebook_id`, `image_url`, `cover_image_url`, `mobile_first`, `optional1`, `optional2`, `optional3`, `created_at`, `updated_at`) VALUES
(1, 'Brunno', 'Mars', '', 0, '0000-00-00', '', 0, 0, 0, 1, 0.000000, 0.000000, 0, 'c7kp75T6HyHC6TQJdhGuVeRR7YQhLjHHCNbqGqMYQxCdcxrdN4gF4auQWntwRH5wexNxG5GgBypQf3ZWShJWLMt6w3y9gsYdxTTX', 'commons/images/bruno.png', '', 0, '', '', '', '2017-02-26 12:55:02', '2017-03-03 14:10:31'),
(2, 'Johnny', 'Depp', '', 0, '0000-00-00', '', 0, 0, 0, 1, 0.000000, 0.000000, 0, 'c7kp75T6HyHC6TQJdhGuVeRR7YQhLjHHCNbqGqMYQxCdcxrdN4gF4auQWntwRH5wexNxG5GgBypQf3ZWShJWLMt6w3y9gsYdxTTX', 'commons/images/depp.png', '', 0, '', '', '', '2017-02-26 13:05:07', '2017-03-03 14:10:16'),
(3, 'Moaz', 'El-Nashar', 'moaz_elnashar@hotmail.com', 0, '0000-00-00', '', 0, 0, 0, 1, 0.000000, 0.000000, 0, '10154197419592750', 'https://scontent.xx.fbcdn.net/v/t1.0-1/p480x480/13938464_10153642840417750_4350541607524174011_n.jpg?oh=0523e020d8ea66abf3dcb1f795e161dc&oe=592870D9', '', 0, '', '', '', '2017-02-28 20:52:30', '2017-03-03 13:32:53'),
(4, 'Blake', 'Lively', '', 0, '0000-00-00', '', 0, 0, 0, 1, 0.000000, 0.000000, 0, '', 'commons/images/blake.png', '', 1, '', '', '', '0000-00-00 00:00:00', '2017-03-03 14:19:08'),
(5, 'Alicia', 'Keys', '', 0, '0000-00-00', '', 0, 0, 0, 1, 0.000000, 0.000000, 0, '', 'commons/images/alicakeys.png', '', 1, '', '', '', '0000-00-00 00:00:00', '2017-03-03 14:24:41'),
(6, 'Seth', 'Rogen', '', 0, '0000-00-00', '', 0, 0, 0, 1, 0.000000, 0.000000, 0, '', 'commons/images/seth.png', '', 1, '', '', '', '0000-00-00 00:00:00', '2017-03-03 14:23:11'),
(7, 'Natalie', 'Dormer', '', 0, '0000-00-00', '', 0, 0, 0, 1, 0.000000, 0.000000, 0, '', 'commons/images/natalie.png', '', 1, '', '', '', '0000-00-00 00:00:00', '2017-03-03 14:23:15');

-- --------------------------------------------------------

--
-- Table structure for table `user_activity`
--

CREATE TABLE IF NOT EXISTS `user_activity` (
  `user_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_activity`
--

INSERT INTO `user_activity` (`user_id`, `activity_id`, `created_at`) VALUES
(3, 3, '2017-03-03 12:06:16'),
(3, 4, '2017-03-03 12:06:16'),
(3, 6, '2017-03-03 12:06:16'),
(1, 3, '2017-03-03 13:32:01'),
(2, 3, '2017-03-03 13:32:01'),
(6, 4, '2017-03-03 14:20:24'),
(6, 1, '2017-03-03 14:22:12'),
(6, 2, '2017-03-03 14:22:12'),
(6, 8, '2017-03-03 14:22:12'),
(5, 8, '2017-03-03 14:22:12'),
(5, 4, '2017-03-03 14:22:12'),
(5, 1, '2017-03-03 14:22:12'),
(4, 1, '2017-03-03 14:22:12'),
(4, 2, '2017-03-03 14:22:12'),
(4, 3, '2017-03-03 14:22:12'),
(4, 4, '2017-03-03 14:22:12'),
(4, 5, '2017-03-03 14:22:12'),
(4, 6, '2017-03-03 14:22:12'),
(4, 7, '2017-03-03 14:22:12'),
(4, 8, '2017-03-03 14:22:12'),
(2, 5, '2017-03-03 14:22:57');

-- --------------------------------------------------------

--
-- Table structure for table `user_activity_history`
--

CREATE TABLE IF NOT EXISTS `user_activity_history` (
  `user_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_blocking`
--

CREATE TABLE IF NOT EXISTS `user_blocking` (
  `user_id` int(11) NOT NULL,
  `blocking_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_blocking_history`
--

CREATE TABLE IF NOT EXISTS `user_blocking_history` (
  `user_id` int(11) NOT NULL,
  `blocking_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_blocking_history`
--

INSERT INTO `user_blocking_history` (`user_id`, `blocking_id`, `status`, `created_at`) VALUES
(2, 1, 1, '2017-02-26 17:20:51'),
(2, 1, 2, '2017-02-26 17:24:13'),
(2, 1, 1, '2017-02-26 17:25:29'),
(2, 1, 2, '2017-02-26 17:26:06');

-- --------------------------------------------------------

--
-- Table structure for table `user_following`
--

CREATE TABLE IF NOT EXISTS `user_following` (
  `user_id` int(11) NOT NULL,
  `following_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_following_history`
--

CREATE TABLE IF NOT EXISTS `user_following_history` (
  `user_id` int(11) NOT NULL,
  `following_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_following_history`
--

INSERT INTO `user_following_history` (`user_id`, `following_id`, `status`, `created_at`) VALUES
(2, 1, 1, '0000-00-00 00:00:00'),
(2, 1, 0, '2017-02-26 16:41:10'),
(2, 1, 2, '2017-02-26 16:42:04'),
(2, 1, 2, '2017-02-26 16:44:17'),
(2, 1, 1, '2017-02-26 16:44:50'),
(2, 1, 2, '2017-02-26 16:45:02');

-- --------------------------------------------------------

--
-- Table structure for table `user_reporting`
--

CREATE TABLE IF NOT EXISTS `user_reporting` (
  `user_id` int(11) NOT NULL,
  `reporting_id` int(11) NOT NULL,
  `reporting_reason` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_reporting`
--

INSERT INTO `user_reporting` (`user_id`, `reporting_id`, `reporting_reason`, `created_at`) VALUES
(2, 1, '', '2017-02-26 18:05:12'),
(2, 1, 'lolo', '2017-02-26 18:05:28');

-- --------------------------------------------------------

--
-- Table structure for table `user_token`
--

CREATE TABLE IF NOT EXISTS `user_token` (
  `user_id` int(11) NOT NULL,
  `token` text NOT NULL,
  `refresher_token` text NOT NULL,
  `device_id` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_token`
--

INSERT INTO `user_token` (`user_id`, `token`, `refresher_token`, `device_id`, `created_at`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxLCJpYXQiOjE0ODgxMDY1MDIsImV4cCI6MTQ4ODE5MjkwMn0.ojzEddU8KwQ-z_hWVzEX05Nw-p0TFAVMuUgPGcTDfJQ', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxLCJpYXQiOjE0ODgxMDY1MDIsImV4cCI6MTQ5MzI5MDUwMn0.pd6XxHLq8ijKyK6JP-5g_-hnCBBttUr1iIkkwn8IUK4', '', '2017-02-26 10:55:02'),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoyLCJpYXQiOjE0ODgxMDcxMDcsImV4cCI6MTQ4ODEwNzEwN30.UUEu0Q3LfB6YahqoEhCPatmOJ__-n_a5ljwHihdo08I', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoyLCJpYXQiOjE0ODgxMDcxMDcsImV4cCI6MTQ5MzI5MTEwN30.OwtZWQfpDgKO3wsONfqTmnfTNxuCoSdGISKfY-aTEIo', '', '2017-02-26 11:05:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
