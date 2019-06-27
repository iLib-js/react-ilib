/*
 * utils.js - various shared utility functions
 *
 * Copyright © 2019, JEDLSoft
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
 * Return true if left is the same as right when compared in a shallow
 * fashion.
 * 
 * @param {Object} left the left object to compare
 * @param {Object} right the right object to compare
 * @return {boolean} true when the two objects have the same values when
 * compared in a shallow fashion 
 */
export function objectEquals(left, right) {
    if (typeof(left) !== typeof(right)) return false;
    if (!left && !right) return true;
    if (!left || !right) return false;
    
    if (typeof(left) === "object") {
        let keys = Object.keys(left);
        if (keys.length !== Object.keys(right).length) return false;
        
        return Object.keys(left).every(property => {
            return left[property] === right[property];
        });
    } else {
        return left === right;
    }
};
