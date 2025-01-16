/**
 * @license
 * Copyright (c) TechAurelian {@link https://techaurelian.com}
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-check

import { joinPosixPath, getImageData } from './utils.js';

/**
 * Adds the specified imageUrl filter to Eleventy.
 * 
 * @param {object} eleventyConfig The Eleventy configuration object.
 * @param {string} filterName The name of the filter.
 * @param {Array} zones The array of image zones.
 */
export function addImageUrlFilter(eleventyConfig, filterName, zones) {
  /**
   * Returns the image URL with the correct path for the provided image source.
   * @param {string} src The image source.
   * @returns {string} The image URL.
   */
  const imageUrl = function(src) {
    const data = getImageData(src, zones);
    return joinPosixPath(data.baseUrl, data.imageSrc);
  };

  // Add the filter to Eleventy
  eleventyConfig.addFilter(filterName, imageUrl);
}
