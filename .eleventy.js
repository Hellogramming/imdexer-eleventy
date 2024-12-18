/**
 * Copyright 2024 Hellogramming (https://www.hellogramming.com/). All rights reserved.
 * See LICENSE in the project root for license information.
 * @author TechAurelian <dev@techaurelian.com> (https://techaurelian.com)
 */

import { addImageShortcode } from "./src/image-shortcode.js";

export default function (eleventyConfig, options = {}) {
  // TODO: Validate options

  if (options.imgShortcode) {
    addImageShortcode(eleventyConfig, options.imgShortcode, options.zones);
  }
};