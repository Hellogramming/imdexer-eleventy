/**
 * Copyright 2024 Appliberated (https://appliberated.com). All rights reserved.
 * See LICENSE in the project root for license information.
 * @author TechAurelian <dev@techaurelian.com> (https://techaurelian.com)
 */

import { PACKAGE_NAME } from './consts.js';
import { joinPosixPath } from './utils.js';

/**
 * Adds the specified image shortcode to Eleventy.
 * 
 * @param {object} eleventyConfig The Eleventy configuration object.
 * @param {string} shortcodeName The name of the shortcode.
 * @param {object} imdexer The imdexer object containing data for the images.
 * @param {string} baseUrl The base URL for the images.
 */
export function addImageShortcode(eleventyConfig, shortcodeName, zones) {

  /**
   * Returns the content for the image shortcode, which is a HTML image tag with attributes
   * computed from the provided arguments.
   * @param {object} args The arguments for the shortcode.
   * @returns {string} The HTML image tag.
   */
  const imageShortcode = function (args) {
    
    // Get the image data based on the optional prefix and available zones
    const data = getImageData(args.src, zones);

    // Generate and return the HTML image tag
    return generateImageTag(data.imdexer, data.baseUrl, data.imageSrc, args.class, args.alt);
  };

  // Add the shortcode to Eleventy
  eleventyConfig.addShortcode(shortcodeName, imageShortcode);
}

/**
 * Gets the image data for the specified image source based on the available zones.
 * 
 * @param {string} src The source of the image.
 * @param {Array} zones The array of image zones.
 * @returns {Object} The image data object containing the image source, imdexer, and base URL.
 */
function getImageData(src, zones) {

  // If there is only one entry in the zones array, return its data
  if (zones.length === 1) {
    return {
      imageSrc: src, // There should be no prefix to remove
      imdexer: zones[0].imdexer,
      baseUrl: zones[0].baseUrl,
    }
  }

  // Otherwise, find the zone that matches the image source based on the prefix, and return its data
  for (const zone of zones) {
    if (src.startsWith(zone.prefix)) {
      return {
        imageSrc: src.slice(zone.prefix.length), // Remove the prefix from the image source
        imdexer: zone.imdexer,
        baseUrl: zone.baseUrl,
      }
    }
  }

  // If no zone matches the image source, throw an error
  throw new Error(`No zone found for image: ${src}`);
}


/**
 * Generates an image tag for the specified image.
 * 
 * @param {Object} imdexer The imdexer object containing data for the images.
 * @param {string} baseUrl The base URL for the images.
 * @param {string} src The source of the image.
 * @param {string} classAttr The class attribute for the image.
 * @param {string} alt The alt attribute for the image.
 * @returns {string} The HTML image tag.
 */
function generateImageTag(imdexer, baseUrl, src, classAttr, alt) {

  if (!imdexer) {
    throw new Error(`${PACKAGE_NAME} requires an imdexer object.`);
  }

  // Check if alt text is provided. This is required for accessibility.
  // For decorative images, use an empty string for the alt attribute.
  if (alt === undefined) {
    throw new Error(`Missing \`alt\` attribute for image: ${src}`);
  }

  if (!src) {
    throw new Error(`Missing \`src\` attribute for image: ${src}`);
  }

  // Get the image data from the imdexer
  const data = imdexer[src];
  if (!data) {
    throw new Error(`Missing image data for image: ${src}`);
  }

  // If this is a single (non-grouped) image, return a simple image tag
  if (!data.files) {
    // Get the image size from the image data
    const width = data.width;
    const height = data.height;

    // Correctly join the base URL and the image source
    const fullSrc = joinPosixPath(baseUrl, src);

    // Return the image tag
    return `<img src="${fullSrc}" ${classAttr ? `class="${classAttr}"` : ''} width="${width}" height="${height}" alt="${alt}" />`;
  }
}
