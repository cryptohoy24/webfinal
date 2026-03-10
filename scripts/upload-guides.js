/**
 * Script to upload guide PDFs to Supabase Storage
 *
 * Run this script once to upload the PDF guides to the protected Supabase Storage bucket.
 *
 * Usage: node scripts/upload-guides.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const FILES_TO_UPLOAD = [
  {
    localPath: 'public/guides/guia-p2p-de-bybit.pdf',
    storagePath: 'Guia-P2P-de-Bybit.pdf',
  },
  // Add more files here as needed
  // {
  //   localPath: 'public/guides/guia-bybit-earn.pdf',
  //   storagePath: 'Guia-Bybit-Earn.pdf',
  // },
];

async function uploadFile(localPath, storagePath) {
  try {
    const filePath = path.join(process.cwd(), localPath);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${localPath}`);
      return false;
    }

    const fileBuffer = fs.readFileSync(filePath);

    console.log(`📤 Uploading ${storagePath}...`);

    const { data, error } = await supabase.storage
      .from('guides')
      .upload(storagePath, fileBuffer, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (error) {
      console.error(`❌ Error uploading ${storagePath}:`, error.message);
      return false;
    }

    console.log(`✅ Successfully uploaded ${storagePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Unexpected error uploading ${storagePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting PDF upload to Supabase Storage...\n');

  let successCount = 0;
  let failCount = 0;

  for (const file of FILES_TO_UPLOAD) {
    const success = await uploadFile(file.localPath, file.storagePath);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log('\n📊 Upload Summary:');
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);

  if (failCount === 0) {
    console.log('\n🎉 All files uploaded successfully!');
  } else {
    console.log('\n⚠️  Some files failed to upload. Please check the errors above.');
  }
}

main();
