import { MongoClient, type Collection, type Db } from 'mongodb';
import { env } from '$env/dynamic/private';

export const QUOTES_COLLECTION = 'quotes';

/**
 * Cloudflare Workers tie every socket to the request that opened it, so a
 * cached MongoClient throws "Cannot perform I/O on behalf of a different
 * request" on the second hit. The client is therefore opened and closed inside
 * the request that uses it. Volume here is a handful of leads a day, so the
 * connect cost is irrelevant.
 */
export const withDb = async <T>(run: (db: Db) => Promise<T>): Promise<T> => {
	const uri = env.MONGODB_URI;
	if (!uri) throw new Error('MONGODB_URI is not set');

	const client = new MongoClient(uri, {
		serverSelectionTimeoutMS: 8000,
		connectTimeoutMS: 8000,
		retryWrites: true
	});

	try {
		await client.connect();
		return await run(client.db(env.MONGODB_DB || 'meno'));
	} finally {
		await client.close().catch(() => {});
	}
};

export const quotes = (db: Db): Collection<QuoteDocument> =>
	db.collection<QuoteDocument>(QUOTES_COLLECTION);

export interface QuoteDocument {
	name: string;
	email: string;
	company: string;
	url: string;
	needs: string[];
	volume: string;
	budget: string;
	brief: string;
	deadline: string;
	source: string;
	locale: string;
	status: 'new';
	meta: {
		ip: string;
		userAgent: string;
		referer: string;
		country: string;
	};
	createdAt: Date;
}
