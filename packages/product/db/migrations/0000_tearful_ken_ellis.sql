CREATE TABLE `pictures` (
	`id` varchar(36) NOT NULL,
	`product_id` varchar(36) NOT NULL,
	`url` tinytext NOT NULL,
	CONSTRAINT `pictures_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` varchar(36) NOT NULL,
	`owner_id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` tinytext NOT NULL,
	CONSTRAINT `products_id` PRIMARY KEY(`id`),
	CONSTRAINT `products_owner_id_unique` UNIQUE(`owner_id`)
);
--> statement-breakpoint
CREATE TABLE `products_to_types` (
	`product_id` varchar(36) NOT NULL,
	`type_id` varchar(36) NOT NULL,
	CONSTRAINT `products_to_types_product_id_type_id` PRIMARY KEY(`product_id`,`type_id`)
);
--> statement-breakpoint
CREATE TABLE `types` (
	`id` varchar(36) NOT NULL,
	`name` varchar(50) NOT NULL,
	CONSTRAINT `types_id` PRIMARY KEY(`id`),
	CONSTRAINT `name_idx` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE INDEX `product_idx` ON `pictures` (`product_id`);--> statement-breakpoint
CREATE INDEX `product_idx` ON `products_to_types` (`product_id`);--> statement-breakpoint
CREATE INDEX `type_idx` ON `products_to_types` (`type_id`);