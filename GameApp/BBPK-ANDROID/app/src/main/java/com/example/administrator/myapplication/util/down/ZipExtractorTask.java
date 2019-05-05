package com.example.administrator.myapplication.util.down;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipFile;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.DialogInterface.OnCancelListener;
import android.os.AsyncTask;
import android.util.Log;

import com.example.administrator.myapplication.util.event.UnZipFinish;

import org.greenrobot.eventbus.EventBus;

public class ZipExtractorTask extends AsyncTask<Void, Integer, Long> {
	private final String TAG = "ZipExtractorTask";
	private final File mInput;
	private final File mOutput;
//	private final ProgressDialog mDialog;
//	private int mProgress = 0;
	private final Context mContext;
	private boolean mReplaceAll;
	private String zipFileName;
	public ZipExtractorTask(String zipFileName, String in, String out, Context context, boolean replaceAll){
		super();
		this.zipFileName = zipFileName;
		mInput = new File(in);
		mOutput = new File(out);
		if(!mOutput.exists()){
			if(!mOutput.mkdirs()){
//				Log.e(TAG, "Failed to make directories:"+mOutput.getAbsolutePath());
			}
		}
//		if(context!=null){
//			mDialog = new ProgressDialog(context);
//		} else{
//			mDialog = null;
//		}
		mContext = context;
		mReplaceAll = replaceAll;
	}
	@Override
	protected Long doInBackground(Void... params) {
		return unzip();
	}
	
	@Override
	protected void onPostExecute(Long result) {
//		if(mDialog!=null&&mDialog.isShowing()){
//			mDialog.dismiss();
//		}
		EventBus.getDefault().post(new UnZipFinish(zipFileName));

	}
	@Override
	protected void onPreExecute() {
		// TODO Auto-generated method stub
		//super.onPreExecute();
//		if(mDialog!=null){
//			mDialog.setCancelable(false);
//			mDialog.setTitle("Extracting");
//			mDialog.setMessage(mInput.getName());
//			mDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
//			mDialog.show();
//		}
	}
	@Override
	protected void onProgressUpdate(Integer... values) {
		// TODO Auto-generated method stub
		//super.onProgressUpdate(values);
//		if(mDialog==null)
//			return;
//		if(values.length>1){
//			int max=values[1];
//			mDialog.setMax(max);
//		}
//		else
//			mDialog.setProgress(values[0].intValue());
	}
	private long unzip(){
		long extractedSize = 0L;
		Enumeration<ZipEntry> entries;
		ZipFile zip = null;
		try {
			zip = new ZipFile(mInput);
			long uncompressedSize = getOriginalSize(zip);
			publishProgress(0, (int) uncompressedSize);
			
			entries = (Enumeration<ZipEntry>) zip.entries();
			while(entries.hasMoreElements()){
				ZipEntry entry = entries.nextElement();
				if(entry.isDirectory()){
					continue;
				}
				File destination = new File(mOutput, entry.getName());
				if(!destination.getParentFile().exists()){
//					Log.e(TAG, "make="+destination.getParentFile().getAbsolutePath());
					destination.getParentFile().mkdirs();
				}
				if(destination.exists()&&mContext!=null&&!mReplaceAll){
					
				}
				ProgressReportingOutputStream outStream = new ProgressReportingOutputStream(destination);
				extractedSize+=copy(zip.getInputStream(entry),outStream);
				outStream.close();
			}
		} catch (ZipException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			try {
				zip.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
 
		return extractedSize;
	}
 
	private long getOriginalSize(ZipFile file){
		Enumeration<ZipEntry> entries = (Enumeration<ZipEntry>) file.entries();
		long originalSize = 0l;
		while(entries.hasMoreElements()){
			ZipEntry entry = entries.nextElement();
			if(entry.getSize()>=0){
				originalSize+=entry.getSize();
			}
		}
		return originalSize;
	}
	
	private int copy(InputStream input, OutputStream output){
		byte[] buffer = new byte[1024*8];
		BufferedInputStream in = new BufferedInputStream(input, 1024*8);
		BufferedOutputStream out  = new BufferedOutputStream(output, 1024*8);
		int count =0,n=0;
		try {
			while((n=in.read(buffer, 0, 1024*8))!=-1){
				out.write(buffer, 0, n);
				count+=n;
			}
			out.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			try {
				out.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			try {
				in.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return count;
	}
	
	private final class ProgressReportingOutputStream extends FileOutputStream{
 
		public ProgressReportingOutputStream(File file)
				throws FileNotFoundException {
			super(file);
		}
 
		@Override
		public void write(byte[] buffer, int byteOffset, int byteCount)
				throws IOException {
			super.write(buffer, byteOffset, byteCount);
//		    mProgress += byteCount;
//		    publishProgress(mProgress);
		}
		
	}
}