/**
 * Copyright 2017 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// This is an end-to-end test that focuses on exercising all parts of the fabric APIs
// in a happy-path scenario
'use strict';

var tape = require('tape');
var _test = require('tape-promise').default;
var test = _test(tape);
var e2eUtils = require('../e2e/e2eUtils.js');
var testUtils = require('../../unit/util');
var chaincodeId = testUtils.NODE_END2END.chaincodeId;

test('\n\n***** Node-Chaincode End-to-end flow: invoke transaction to move money *****\n\n', async (t) => {
	const fcn = 'move';
	const args = ['a', 'b','100'];
	let expectedResult = 'move succeed';
	try {
		let result = await e2eUtils.invokeChaincode('org2', 'v0', chaincodeId, t, false/*useStore*/, fcn, args, expectedResult);
		if(result){
			t.pass('Successfully invoke transaction chaincode on channel');
			await testUtils.sleep(5000);
		}
		else {
			t.fail('Failed to invoke transaction chaincode ');
		}
	} catch(err) {
		t.fail('Failed to invoke transaction chaincode on channel. ' + err.stack ? err.stack : err);
	}

	try {
		expectedResult = new Error('throwError: an error occurred');
		let result = await e2eUtils.invokeChaincode('org2', 'v0', chaincodeId, t, false/*useStore*/, 'throwError', args, expectedResult);
		if(result){
			t.pass('Successfully handled invocation errors');
		}
		else {
			t.fail('Failed to invoke transaction chaincode ');
		}

	} catch(err) {
		t.fail('Failed to query chaincode on the channel. ' + err.stack ? err.stack : err);
	}
	t.end();
});
