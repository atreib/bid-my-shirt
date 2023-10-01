CREATE TABLE `profiles` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`weight` double(6,2),
	`body_type` enum('slender','petite','stout','ample','muscular'),
	CONSTRAINT `profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `profiles_user_id_unique` UNIQUE(`user_id`),
	CONSTRAINT `user_id_idx` UNIQUE(`id`)
);
