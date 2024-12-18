/**
 * Copyright 2024 Hellogramming (https://www.hellogramming.com/). All rights reserved.
 * See LICENSE in the project root for license information.
 * @author TechAurelian <dev@techaurelian.com> (https://techaurelian.com)
 */

// @ts-check

/**
 * Joins two paths using the POSIX path separator, ensuring that there is only one separator
 * between them.
 * 
 * @param {string} path1 The first path.
 * @param {string} path2 The second path.
 * @returns {string} The joined path.
 */
export function joinPosixPath(path1, path2) {
  if (!path1 || !path2) return path1 + path2;
  return path1.replace(/\/$/, '') + '/' + path2.replace(/^\//, '');
};
