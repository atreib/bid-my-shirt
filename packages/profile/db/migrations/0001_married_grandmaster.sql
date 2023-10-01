ALTER TABLE `profiles` RENAME COLUMN `weight` TO `weight_in_kilos`;--> statement-breakpoint
ALTER TABLE `profiles` ADD `height_in_centimeters` double(6,2);