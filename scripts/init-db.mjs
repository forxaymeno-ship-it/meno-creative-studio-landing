/**
 * Creates the indexes the quote collection relies on.
 * Run once per environment:  MONGODB_URI="..." npm run db:setup
 */
import { MongoClient } from 'mongodb';
import { readFileSync } from 'node:fs';

const fromDevVars = (key) => {
	try {
		const line = readFileSync(new URL('../.dev.vars', import.meta.url), 'utf8')
			.split('\n')
			.find((l) => l.startsWith(`${key}=`));
		return line?.slice(key.length + 1).trim().replace(/^["']|["']$/g, '');
	} catch {
		return undefined;
	}
};

const uri = process.env.MONGODB_URI ?? fromDevVars('MONGODB_URI');
const dbName = process.env.MONGODB_DB ?? fromDevVars('MONGODB_DB') ?? 'meno';

if (!uri) {
	console.error('MONGODB_URI is not set (env or .dev.vars).');
	process.exit(1);
}

const client = new MongoClient(uri);
await client.connect();

const quotes = client.db(dbName).collection('quotes');
await quotes.createIndex({ createdAt: -1 }, { name: 'createdAt_desc' });
await quotes.createIndex({ 'meta.ip': 1, createdAt: -1 }, { name: 'ip_recent' });
await quotes.createIndex({ email: 1, createdAt: -1 }, { name: 'email_recent' });
await quotes.createIndex({ status: 1, createdAt: -1 }, { name: 'status_recent' });

console.log(`Indexes ready on ${dbName}.quotes`);
await client.close();
