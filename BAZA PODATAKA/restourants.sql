-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 23, 2020 at 05:23 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restourants`
--

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `id` int(11) NOT NULL,
  `name` varchar(32) COLLATE utf32_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`id`, `name`) VALUES
(1, 'Beograd'),
(3, 'Novi Sad'),
(2, 'Pančevo'),
(4, 'Smederevo');

-- --------------------------------------------------------

--
-- Table structure for table `day_of_week`
--

CREATE TABLE `day_of_week` (
  `id` int(11) NOT NULL,
  `name` varchar(12) COLLATE utf32_unicode_ci NOT NULL,
  `ordinal_number` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `day_of_week`
--

INSERT INTO `day_of_week` (`id`, `name`, `ordinal_number`) VALUES
(1, 'Ponedeljak', 1),
(2, 'Utorak', 2),
(3, 'Sreda', 3),
(4, 'Četvrtak', 4),
(5, 'Petak', 5),
(6, 'Subota', 6),
(7, 'Nedelja', 7);

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `id` int(11) NOT NULL,
  `email` varchar(64) COLLATE utf32_unicode_ci NOT NULL,
  `password` varchar(256) COLLATE utf32_unicode_ci NOT NULL,
  `name` varchar(32) COLLATE utf32_unicode_ci NOT NULL,
  `last_name` varchar(32) COLLATE utf32_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `manager`
--

INSERT INTO `manager` (`id`, `email`, `password`, `name`, `last_name`) VALUES
(1, 'manager@gmail.com', '$2b$05$OcTu64JFZg8E4WHUxPBx5.yIncgffLHShhJsMxFR8PDI0PSnU0u8u', 'Pera', 'Perić'),
(2, 'nikola@gmail.com', '$2b$05$XvfxRI3X8pgYPBqo/d6/FeBIP2wVhLIOBDF/G/3YD.YRFpj2pmKuK', 'Nikola', 'Nikolic'),
(3, 'stefan@gmail.com', '$2b$05$51xhKed7o.9s1sWP8SjdO.ytjo8IMuZVwzSIql/h4qtJqxxtbUdf6', 'Stefan', 'Stefanovic');

-- --------------------------------------------------------

--
-- Table structure for table `non_working_days`
--

CREATE TABLE `non_working_days` (
  `id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `description_id` int(11) NOT NULL,
  `user_description` text COLLATE utf32_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `non_working_days`
--

INSERT INTO `non_working_days` (`id`, `restaurant_id`, `date`, `description_id`, `user_description`) VALUES
(20, 3, '2020-01-01', 1, NULL),
(21, 3, '2020-10-25', 2, NULL),
(22, 3, '2020-10-26', 2, NULL),
(23, 3, '2020-10-17', 2, NULL),
(24, 3, '2020-10-18', 2, NULL),
(25, 3, '2020-10-22', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `non_working_days_desc`
--

CREATE TABLE `non_working_days_desc` (
  `id` int(11) NOT NULL,
  `description` varchar(32) COLLATE utf32_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `non_working_days_desc`
--

INSERT INTO `non_working_days_desc` (`id`, `description`) VALUES
(1, 'Državni praznik'),
(3, 'Ostalo'),
(2, 'Renoviranje');

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `table_id` int(11) NOT NULL,
  `name` varchar(32) COLLATE utf32_unicode_ci NOT NULL,
  `last_name` varchar(32) COLLATE utf32_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf32_unicode_ci NOT NULL,
  `email` varchar(32) COLLATE utf32_unicode_ci NOT NULL,
  `status_id` int(11) NOT NULL,
  `from_time` time NOT NULL,
  `untill_time` time NOT NULL,
  `reservation_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`id`, `table_id`, `name`, `last_name`, `phone`, `email`, `status_id`, `from_time`, `untill_time`, `reservation_date`) VALUES
(5, 5, 'Marko', 'Marković', '063255589', 'marko.markovic@gmail.com', 2, '17:30:00', '20:00:00', '2020-10-24'),
(8, 6, 'Nikola', 'Nikolic', '065599891', 'nikola@gmail.com', 3, '15:00:00', '17:00:00', '2020-10-20'),
(9, 5, 'Marko', 'Mirkovic', '087233232', 'asd1@asd.com', 2, '15:00:00', '16:00:00', '2020-10-24');

-- --------------------------------------------------------

--
-- Table structure for table `reservation_status`
--

CREATE TABLE `reservation_status` (
  `id` int(11) NOT NULL,
  `description` varchar(20) COLLATE utf32_unicode_ci NOT NULL,
  `code` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `reservation_status`
--

INSERT INTO `reservation_status` (`id`, `description`, `code`) VALUES
(1, 'Obrada u toku', 0),
(2, 'Odobrena', 1),
(3, 'Odbijena', 2);

-- --------------------------------------------------------

--
-- Table structure for table `restourant`
--

CREATE TABLE `restourant` (
  `id` int(11) NOT NULL,
  `manager_id` int(11) NOT NULL,
  `name` varchar(32) COLLATE utf32_unicode_ci NOT NULL,
  `description` text COLLATE utf32_unicode_ci DEFAULT NULL,
  `address` varchar(64) COLLATE utf32_unicode_ci NOT NULL,
  `city_id` int(11) NOT NULL,
  `photo` varchar(128) COLLATE utf32_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `restourant`
--

INSERT INTO `restourant` (`id`, `manager_id`, `name`, `description`, `address`, `city_id`, `photo`) VALUES
(3, 1, 'Little Bay', NULL, 'Dositejeva 9a', 1, NULL),
(13, 2, 'Zvezdara Teatar', '', 'Milana Rakića 32', 1, NULL),
(14, 3, 'Majdan', 'Lep amnijent', 'Bulevar kralja Aleksandra 21', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `restourant_tables`
--

CREATE TABLE `restourant_tables` (
  `id` int(11) NOT NULL,
  `restourant_id` int(11) NOT NULL,
  `table_number` int(11) NOT NULL,
  `description_id` int(11) NOT NULL,
  `capacity` tinyint(2) NOT NULL,
  `max_hours_available` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `restourant_tables`
--

INSERT INTO `restourant_tables` (`id`, `restourant_id`, `table_number`, `description_id`, `capacity`, `max_hours_available`) VALUES
(5, 3, 1, 1, 4, 3),
(6, 3, 2, 1, 4, 2),
(10, 3, 3, 3, 2, 2),
(11, 3, 4, 1, 5, 5),
(13, 3, 5, 2, 5, 3),
(14, 13, 0, 3, 4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `restourant_working_hours`
--

CREATE TABLE `restourant_working_hours` (
  `id` int(11) NOT NULL,
  `restourant_id` int(11) NOT NULL,
  `day_of_week_id` int(11) NOT NULL,
  `opening_time` time NOT NULL,
  `closing_time` time NOT NULL,
  `is_working` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `restourant_working_hours`
--

INSERT INTO `restourant_working_hours` (`id`, `restourant_id`, `day_of_week_id`, `opening_time`, `closing_time`, `is_working`) VALUES
(20, 3, 1, '00:30:00', '19:00:00', 1),
(21, 3, 2, '06:00:00', '18:30:00', 1),
(22, 3, 3, '05:30:00', '01:00:00', 1),
(23, 3, 4, '13:00:00', '19:00:00', 1),
(24, 3, 5, '11:00:00', '23:00:00', 1),
(25, 3, 6, '10:00:00', '23:00:00', 1),
(26, 3, 7, '07:00:00', '21:00:00', 1),
(27, 13, 1, '10:00:00', '18:00:00', 1),
(28, 13, 2, '11:00:00', '20:00:00', 1),
(29, 13, 3, '17:00:00', '23:00:00', 1),
(30, 13, 4, '08:00:00', '23:00:00', 1),
(31, 13, 5, '10:00:00', '20:00:00', 1),
(32, 13, 6, '10:00:00', '02:00:00', 1),
(33, 13, 7, '09:00:00', '01:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `table_desc`
--

CREATE TABLE `table_desc` (
  `id` int(11) NOT NULL,
  `description` varchar(32) COLLATE utf32_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `table_desc`
--

INSERT INTO `table_desc` (`id`, `description`) VALUES
(3, 'Na sred sale'),
(2, 'Pored prozora'),
(4, 'Romantični kutak'),
(1, 'Separe');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `City_Name_Unique` (`name`);

--
-- Indexes for table `day_of_week`
--
ALTER TABLE `day_of_week`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Day_Name_Unique` (`name`),
  ADD UNIQUE KEY `Oridnal_Number_Unique` (`ordinal_number`);

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Email_Unique` (`email`);

--
-- Indexes for table `non_working_days`
--
ALTER TABLE `non_working_days`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurant_id` (`restaurant_id`),
  ADD KEY `description_id` (`description_id`);

--
-- Indexes for table `non_working_days_desc`
--
ALTER TABLE `non_working_days_desc`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Description_Unique` (`description`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `table_id` (`table_id`),
  ADD KEY `status_id` (`status_id`);

--
-- Indexes for table `reservation_status`
--
ALTER TABLE `reservation_status`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `description` (`description`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `restourant`
--
ALTER TABLE `restourant`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_unique` (`name`) USING BTREE,
  ADD KEY `manager_id` (`manager_id`),
  ADD KEY `city_id` (`city_id`);

--
-- Indexes for table `restourant_tables`
--
ALTER TABLE `restourant_tables`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `restourant_table_unique` (`restourant_id`,`table_number`) USING BTREE,
  ADD KEY `description_id` (`description_id`);

--
-- Indexes for table `restourant_working_hours`
--
ALTER TABLE `restourant_working_hours`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `restourant_id` (`restourant_id`,`day_of_week_id`),
  ADD KEY `day_of_week_id` (`day_of_week_id`);

--
-- Indexes for table `table_desc`
--
ALTER TABLE `table_desc`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Description_Unique` (`description`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `day_of_week`
--
ALTER TABLE `day_of_week`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `non_working_days`
--
ALTER TABLE `non_working_days`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `non_working_days_desc`
--
ALTER TABLE `non_working_days_desc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `reservation_status`
--
ALTER TABLE `reservation_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `restourant`
--
ALTER TABLE `restourant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `restourant_tables`
--
ALTER TABLE `restourant_tables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `restourant_working_hours`
--
ALTER TABLE `restourant_working_hours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `table_desc`
--
ALTER TABLE `table_desc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `non_working_days`
--
ALTER TABLE `non_working_days`
  ADD CONSTRAINT `non_working_days_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restourant` (`id`),
  ADD CONSTRAINT `non_working_days_ibfk_2` FOREIGN KEY (`description_id`) REFERENCES `non_working_days_desc` (`id`);

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`table_id`) REFERENCES `restourant_tables` (`id`),
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `reservation_status` (`id`);

--
-- Constraints for table `restourant`
--
ALTER TABLE `restourant`
  ADD CONSTRAINT `restourant_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`id`),
  ADD CONSTRAINT `restourant_ibfk_2` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`);

--
-- Constraints for table `restourant_tables`
--
ALTER TABLE `restourant_tables`
  ADD CONSTRAINT `restourant_tables_ibfk_1` FOREIGN KEY (`restourant_id`) REFERENCES `restourant` (`id`),
  ADD CONSTRAINT `restourant_tables_ibfk_2` FOREIGN KEY (`description_id`) REFERENCES `table_desc` (`id`);

--
-- Constraints for table `restourant_working_hours`
--
ALTER TABLE `restourant_working_hours`
  ADD CONSTRAINT `restourant_working_hours_ibfk_1` FOREIGN KEY (`restourant_id`) REFERENCES `restourant` (`id`),
  ADD CONSTRAINT `restourant_working_hours_ibfk_2` FOREIGN KEY (`day_of_week_id`) REFERENCES `day_of_week` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
