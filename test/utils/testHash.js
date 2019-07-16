/*
 * testHash.js - test the hash functions.
 *
 * Copyright © 2018-2019, JEDLSoft
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

import hashKey from "../../src/utils/hash.js";

module.exports.hash = {
    testHashKey: function(test) {
        test.expect(1);

        test.equal(hashKey("This is a test"), "r654479252");

        test.done();
    },

    testHashKeySimpleTexts1: function(test) {
        test.expect(5);

        test.equals(hashKey("Settings in your profile"), "r618035987");
        test.equals(hashKey("All locations"), "r246937959");
        test.equals(hashKey("Conditions"), "r103883086");
        test.equals(hashKey("Everything"), "r414542544");
        test.equals(hashKey("Locations"), "r29058502");

        test.done();
    },

    testHashKeySimpleTexts2: function(test) {
        test.expect(5);

        test.equals(hashKey("Procedures"), "r807691021");
        test.equals(hashKey("Functions"), "r535786086");
        test.equals(hashKey("Morning and afternoon"), "r409842466");
        test.equals(hashKey("Evening"), "r72303136");
        test.equals(hashKey("Nighttime"), "r332185734");

        test.done();
    },

    testHashKeySimpleTexts3: function(test) {
        test.expect(8);

        test.equals(hashKey("Private Profile"), "r314592735");
        test.equals(hashKey("People you are connected to"), "r711926199");
        test.equals(hashKey("Notifications"), "r284964820");
        test.equals(hashKey("News"), "r613036745");
        test.equals(hashKey("More Tips"), "r216617786");
        test.equals(hashKey("Filters"), "r81370429");
        test.equals(hashKey("Referral Link"), "r140625167");
        test.equals(hashKey("Questions"), "r256277957");

        test.done();
    },

    testHashKeyEscapes: function(test) {
        test.expect(2);

        test.equals(hashKey("Can\'t find id"), "r743945592");
        test.equals(hashKey("Can\'t find an application for SMS"), "r909283218");

        test.done();
    },

    testHashKeyPunctuation: function(test) {
        test.expect(6);

        test.equals(hashKey("{name}({generic_name})"), "r300446104");
        test.equals(hashKey("{name}, {sharer_name} {start}found this interesting{end}"), "r8321889");
        test.equals(hashKey("{sharer_name} {start}found this interesting{end}"), "r639868344");
        test.equals(hashKey("Grow your network"), "r214079422");
        test.equals(hashKey("Failed to send connection request!"), "r1015770123");
        test.equals(hashKey("Connection request copied!"), "r136272443");

        test.done();
    },

    testHashKeySameStringMeansSameKey: function(test) {
        test.expect(2);

        test.equal(hashKey("This is a test"), "r654479252");
        test.equal(hashKey("This is a test"), "r654479252");

        test.done();
    }
};