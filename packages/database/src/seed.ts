export {};

async function main() {
  console.log('Seeding database...');
  // Add seed logic here
  console.log('Seeding complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Seeding failed', err);
  process.exit(1);
});
