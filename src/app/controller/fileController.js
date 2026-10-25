import fs from 'fs';
import path from 'path';

import {
	CONTENT_TYPE_PREFIX_BY_SUFFIX_MAP
} from '../constant/contentType';

import {
	buildError,
	status
} from '../helper/status';

import { getLog } from '../util/log';

const log = getLog('fileController');

export const getContentType = extension => {
	const suffix = 	CONTENT_TYPE_PREFIX_BY_SUFFIX_MAP[extension];
	return `${suffix}/${extension}`;
}

export const getExtension = text => {
	const array = text.split('.');
	return array[array.length - 1];
}

export const get = async (req, res) => {
	const { filePathEncoded } = req.params;
	log('get', { filePathEncoded });
	const filePathString = decodeURIComponent(filePathEncoded);
	log('get', { filePathString });
	const extension = getExtension(filePathString);
	log('get', { extension });
	const filePath = path.resolve(filePathString);
	const contentType = getContentType(extension);
	fs.readFile(filePath, (error, data) => {
		if (error) {
			return buildError(log, 'get', error, res);
		}
		res.set('Content-Type', contentType).status(status.success).send(data);
	});
};
