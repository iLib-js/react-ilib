/*
 * hashKey.js - return a hash for a given text
 *
 * Copyright © 2018, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Return a hash identifier for the given source text.
 * @param {string} source the source text to hash
 * @return {string} a hash identifier of the source text
 */
export default function hashKey(source) {
    if (!source) return undefined;
    var hash = 0;
    // these two numbers together = 46 bits so it won't blow out the precision of an integer in javascript
    var modulus = 1073741789; // largest prime number that fits in 30 bits
    var multiple = 65521;     // largest prime that fits in 16 bits, co-prime with the modulus

    // logger.trace("hash starts off at " + hash);

    for (var i = 0; i < source.length; i++) {
        // logger.trace("hash " + hash + " char " + source.charCodeAt(i) + "=" + source.charAt(i));
        hash += source.charCodeAt(i);
        hash *= multiple;
        hash %= modulus;
    }
    var value = "r" + hash;

    // System.out.println("String '" + source + "' hashes to " + value);

    return value;
};
