package com.example.administrator.myapplication;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.ComponentName;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Bitmap;
import android.graphics.Rect;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.provider.MediaStore;
import android.provider.Settings;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v4.content.FileProvider;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;
import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.SimpleTarget;
import com.bumptech.glide.request.transition.Transition;
import com.example.administrator.myapplication.util.AppUtils;
import com.example.administrator.myapplication.util.Constant;
import com.example.administrator.myapplication.util.DialogForPhoto;
import com.example.administrator.myapplication.util.MySharePerference;
import com.example.administrator.myapplication.util.NumberUtil;
import com.example.administrator.myapplication.util.RotationObserver;
import com.example.administrator.myapplication.util.Util;
import com.example.administrator.myapplication.util.down.DownLoaderTask;
import com.example.administrator.myapplication.util.entity.VersionEntity;
import com.example.administrator.myapplication.util.event.InpuChangeEvent;
import com.example.administrator.myapplication.util.event.UnZipFinish;
import com.example.administrator.myapplication.util.network.ApiUtil;
import com.example.administrator.myapplication.util.network.EntityForSimple;
import com.google.gson.Gson;
import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class WebViewActivity extends Activity {
    private String url = "";
    private WebView web_view;
    private ScrollView bitmap_sv;
    private ImageView qrIv;
    private ImageView bgIv;
    private ImageView resultIv;
    private TextView inpTextTv;
    private TextView sureTv;
    private LinearLayout contentLL;
    private RelativeLayout bitmap_rl;
    private RelativeLayout parent_rl;

    private View mChildOfContent;
    private RelativeLayout.LayoutParams relativeLayoutParams;

    private ValueCallback<Uri[]> mUploadCallbackAboveL;
    private ValueCallback<Uri> mUploadCallbackBelow;
    private Uri imageUri;
    private int SYS_INTENT_REQUEST = 0XFF01, CAMERA_INTENT_REQUEST = 0XFF02, IMAGE_CUT = 1;
    private Uri photoUri;
    public String filename = "";
    private Bitmap bmp;

    private final int mRequestCode = 100;
    private List<String> mPermissionList = new ArrayList<>();
    private String[] permissions = new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE,
            Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.CAMERA};
    private boolean hasPermissionDismiss = false;//有权限没有通过
    private RotationObserver rotationObserver;
    private int naviBarWith = -1;
    private String versionStr = "";


    @SuppressLint("AddJavascriptInterface")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        if (Build.VERSION.SDK_INT >= 19) {
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
        }
//        hideBottomUIMenu();
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        setContentView(R.layout.activity_webview);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
        rotationObserver = new RotationObserver(null, this);
        EventBus.getDefault().register(this);
//        ButterKnife.bind(this);
//        url = "http://192.168.10.113:8080";
        naviBarWith = Util.getNavigationBarHeight(this);
        initPermission();

        versionStr = MySharePerference.getShardPerferience(this, Constant.NOW_VERSION, AppUtils.getVersionName(this));
        initShareView();
        initWbView();
        //缓存机制
        initWebViewCache();
        if (!versionStr.equals(AppUtils.getVersionName(this))){
            try {
                String url = "file://" + MyApplication.wwwResourse + "/www/" + MyApplication.zipFileName + "/index.html";
                web_view.loadUrl(url);
            }catch (Exception e){
                e.printStackTrace();
            }
        }else {
            web_view.loadUrl("file:///android_asset/index.html");
        }
        adjustInputTextView();
        web_view.addJavascriptInterface(new JsInterface(), "openApp");
        web_view.setWebViewClient(new WebViewClient());

        getVersion();
    }

    //权限判断和申请
    private void initPermission() {
        mPermissionList.clear();//清空没有通过的权限
        //逐个判断你要的权限是否已经通过
        for (int i = 0; i < permissions.length; i++) {
            if (ContextCompat.checkSelfPermission(this, permissions[i]) != PackageManager.PERMISSION_GRANTED) {
                mPermissionList.add(permissions[i]);//添加还未授予的权限
            }
        }
        //申请权限
        if (mPermissionList.size() > 0) {//有权限没有通过，需要申请
            ActivityCompat.requestPermissions(this, permissions, mRequestCode);
        } else {
            hasPermissionDismiss = false;
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (mRequestCode == requestCode) {
            for (int i = 0; i < grantResults.length; i++) {
                if (grantResults[i] == -1) {
                    hasPermissionDismiss = true;
                }
            }
            if (hasPermissionDismiss) {
            }
        }
    }

    /**
     * 调整显示输入内容的显示区域
     */
    private void adjustInputTextView() {
        FrameLayout content = findViewById(android.R.id.content);
        mChildOfContent = content.getChildAt(0);
        mChildOfContent.getViewTreeObserver().addOnGlobalLayoutListener(() -> {
            int usableHeightNow = computeUsableHeight();
            int usableWidthNow = computeUsableWidth();
            int locationFlag = judgeNavibarLocation();
            int usableHeightSansKeyboard = mChildOfContent.getRootView().getHeight();
            int usableWidthSansKeyboard = mChildOfContent.getRootView().getWidth();
            int heightDifference = usableHeightSansKeyboard - usableHeightNow;
            int widthDifference = usableWidthSansKeyboard - usableWidthNow;
//            Log.v("widthNow=>", + usableWidthNow + "---usableWidthSansKeyboard：" + usableWidthSansKeyboard + "---widthDifference :" + widthDifference);
            if (heightDifference > (usableHeightSansKeyboard / 4)) {
                if (locationFlag == -1){
                    relativeLayoutParams.setMargins(0, usableHeightSansKeyboard - heightDifference - NumberUtil.dip2px(this, 50), 0, 0);
                }else if (locationFlag == 0){
                    relativeLayoutParams.setMargins(naviBarWith, usableHeightSansKeyboard - heightDifference - NumberUtil.dip2px(this, 50), 0, 0);
                }else {
                    relativeLayoutParams.setMargins(0, usableHeightSansKeyboard - heightDifference - NumberUtil.dip2px(this, 50), naviBarWith, 0);
                }
//                relativeLayoutParams.width = widthDifference;
                contentLL.setLayoutParams(relativeLayoutParams);
                contentLL.setVisibility(View.VISIBLE);
            } else {
                contentLL.setVisibility(View.GONE);
                solveNavigationBar(getWindow());
//                inpTextTv.setText("请输入文字");
            }
        });
        relativeLayoutParams = (RelativeLayout.LayoutParams) contentLL.getLayoutParams();
    }

    private int computeUsableHeight() {
        Rect r = new Rect();
        mChildOfContent.getWindowVisibleDisplayFrame(r);
        return r.bottom;
    }
    private int computeUsableWidth() {
        Rect r = new Rect();
        mChildOfContent.getWindowVisibleDisplayFrame(r);
        return r.right;
    }

    /**
     * 判断虚拟按键在左还是在右：0左1右-1没
     * @return
     */
    private int judgeNavibarLocation() {
        Rect r = new Rect();
        mChildOfContent.getWindowVisibleDisplayFrame(r);
        Log.v("rect=>", + r.right + "---" + r.left + "---nag:" + naviBarWith);
        //you 2792 0
        //zuo 2960 168
        if (naviBarWith == -1){//没虚拟键
            return -1;
        }else {
            if (r.left == 0 || r.left != naviBarWith){//虚拟键在右边
                return 1;
            }else {
                return 0;
            }
        }
    }

    private void initShareView() {
        web_view = findViewById(R.id.webView);
        parent_rl = findViewById(R.id.parent_rl);
        inpTextTv = findViewById(R.id.inp_content_tv);
        sureTv = findViewById(R.id.sure_tv);

        bitmap_rl = findViewById(R.id.bitmap_rl);
        contentLL = findViewById(R.id.content_ll);
        qrIv = findViewById(R.id.qr_img);
        resultIv = findViewById(R.id.result_iv);
        bgIv = findViewById(R.id.bg_img);

//        inpTextTv.setText("请输入文字");
        inpTextTv.setOnClickListener((v) -> {
            return;
        });
        sureTv.setOnClickListener((v) -> {
            try {
                contentLL.setVisibility(View.GONE);
                InputMethodManager imm = (InputMethodManager) getSystemService(INPUT_METHOD_SERVICE);
                View v1 = getWindow().peekDecorView();
                if (null != v1) {
                    imm.hideSoftInputFromWindow(v.getWindowToken(), 0);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

    }

    private void initWebViewCache() {
        web_view.getSettings().setRenderPriority(WebSettings.RenderPriority.HIGH);
        web_view.getSettings().setDomStorageEnabled(true);
        String appCachePath = getApplicationContext().getCacheDir().getAbsolutePath();
        web_view.getSettings().setAppCachePath(appCachePath);
        web_view.getSettings().setAllowFileAccess(true);
        web_view.getSettings().setAppCacheEnabled(true);
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void initWbView() {
        WebSettings setting = web_view.getSettings();
        /**支持Js**/
        setting.setJavaScriptEnabled(true);

        /**设置自适应屏幕，两者合用**/
        // 缩放至屏幕的大小
        setting.setLoadWithOverviewMode(true);

        /**缩放操作**/
        // 是否支持画面缩放，默认不支持
        setting.setBuiltInZoomControls(true);
        setting.setSupportZoom(true);
        // 是否显示缩放图标，默认显示
        setting.setDisplayZoomControls(false);
        // 设置网页内容自适应屏幕大小
        setting.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN);
        web_view.setVerticalScrollBarEnabled(false);
        web_view.setVerticalScrollbarOverlay(false);
        web_view.setHorizontalScrollBarEnabled(false);
        web_view.setHorizontalScrollbarOverlay(false);

        /**设置允许JS弹窗**/
        setting.setJavaScriptCanOpenWindowsAutomatically(true);
        // 设置 缓存模式
//        if (NetContent.isNetworkAvailable(WebViewActivity.this)) {
//            setting.setCacheMode(WebSettings.LOAD_DEFAULT);//缓存模式
//        } else {
        setting.setCacheMode(WebSettings.LOAD_DEFAULT);
//        }
        /**设置可以访问文件 **/
        setting.setAllowFileAccess(true);
        setting.setAllowFileAccessFromFileURLs(true);
        setting.setAllowUniversalAccessFromFileURLs(true);

        //图片在最后加载
        setting.setBlockNetworkImage(false);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            setting.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        }
        //设置网页内容自适应屏幕大小
        setting.setUseWideViewPort(true);
        web_view.setWebChromeClient(new WebChromeClient() {
            public void openFileChooser(ValueCallback<Uri> valueCallback) {
                mUploadCallbackBelow = valueCallback;
                if (hasPermissionDismiss) {
                    initPermission();
                    cancelCallback();
                } else {
                    openImageChooserActivity();
                }
            }

            public void openFileChooser(ValueCallback valueCallback, String acceptType) {
                mUploadCallbackBelow = valueCallback;
                if (hasPermissionDismiss) {
                    initPermission();
                    cancelCallback();
                } else {
                    openImageChooserActivity();
                }
            }

            public void openFileChooser(ValueCallback<Uri> valueCallback, String acceptType, String capture) {
                mUploadCallbackBelow = valueCallback;
                if (hasPermissionDismiss) {
                    initPermission();
                    cancelCallback();
                } else {
                    openImageChooserActivity();
                }
            }

            @Override
            public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> valueCallback, FileChooserParams fileChooserParams) {
                mUploadCallbackAboveL = valueCallback;
                if (hasPermissionDismiss) {
                    initPermission();
                    cancelCallback();
                } else {
                    openImageChooserActivity();
                }
                return true;
            }
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.v("onResume", "onResume");
        solveNavigationBar(getWindow());
        if (null != web_view){
            web_view.loadUrl(String.format(Locale.getDefault(), "javascript:setGameVisible('%s')", "1"));
        }
        if (null != rotationObserver) {
            rotationObserver.startObserver();
            rotationObserver.setScreenOrientation();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.v("onPause", "onPause");
        if (null != web_view){
            web_view.loadUrl(String.format(Locale.getDefault(), "javascript:setGameVisible('%s')", "0"));
        }
        if (null != rotationObserver) {
            rotationObserver.stopObserver();
        }

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        EventBus.getDefault().unregister(this);
    }

    /**
     * 解决虚拟按键问题
     * @param window
     */
    public void solveNavigationBar(Window window){
        //保持布局状态
        int uiOptions = View.SYSTEM_UI_FLAG_LAYOUT_STABLE|
                View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION|
                View.SYSTEM_UI_FLAG_FULLSCREEN|
                View.SYSTEM_UI_FLAG_HIDE_NAVIGATION|
                View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN;
        if (Build.VERSION.SDK_INT>=19){
            uiOptions |= 0x00001000;
        }else{
            uiOptions |= View.SYSTEM_UI_FLAG_LOW_PROFILE;
        }
        window.getDecorView().setSystemUiVisibility(uiOptions);
    }

    /**
     * 隐藏虚拟按键，并且全屏
     */
    protected void hideBottomUIMenu() {
        //隐藏虚拟按键，并且全屏
        if (Build.VERSION.SDK_INT > 11 && Build.VERSION.SDK_INT < 19) { // lower api
            View v = this.getWindow().getDecorView();
            v.setSystemUiVisibility(View.GONE);
        } else if (Build.VERSION.SDK_INT >= 19) {
            //for new api versions.
            View decorView = getWindow().getDecorView();
//            int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
//                    | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_FULLSCREEN;

            int uiOptions = View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
//                    | View.SYSTEM_UI_FLAG_FULLSCREEN // hide status bar
                    | View.SYSTEM_UI_FLAG_IMMERSIVE;

            decorView.setSystemUiVisibility(uiOptions);
        }
    }

    private void openApk(String name) {
        Intent intent = new Intent(Intent.ACTION_MAIN, null);
        intent.addCategory(Intent.CATEGORY_LAUNCHER);
        PackageManager packageManager = getApplicationContext().getPackageManager();
        List<ResolveInfo> mlist = packageManager.queryIntentActivities(intent, 0);

        Collections.sort(mlist, new ResolveInfo.DisplayNameComparator(packageManager));

        for (ResolveInfo res : mlist) {
            String pkg = res.activityInfo.packageName;
            String cls = res.activityInfo.name;

            if ("qq".equals(name) && pkg.contains("com.tencent.mobileqq")) {
                jumpApp(pkg, cls);
            } else if ("weixin".equals(name) && pkg.contains("com.tencent.mm")) {
                jumpApp(pkg, cls);
            }
        }
    }

    public void jumpApp(String pkg, String cls) {
        ComponentName componentName = new ComponentName(pkg, cls);
        Intent intent1 = new Intent();
        intent1.setComponent(componentName);
        intent1.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent1);
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void OnInputChange(InpuChangeEvent event) {
        try {
            if (event != null) {
                if (!TextUtils.isEmpty(event.getContent())) {
                    inpTextTv.setTextColor(getResources().getColor(R.color.textcolor1));
                    contentLL.setVisibility(View.VISIBLE);
                    inpTextTv.setText(event.getContent());
                } else {
                    inpTextTv.setTextColor(getResources().getColor(R.color.finish_gray));
//                    contentLL.setVisibility(View.GONE);
                    inpTextTv.setText("请输入文字");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    @Subscribe(threadMode = ThreadMode.MAIN)
    public void UnZipFinish(UnZipFinish event) {
        try {
            if (event != null) {
//                Toast.makeText(this, "解压成功", Toast.LENGTH_SHORT).show();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 生成二维码图片
     */
    private void getQrImg(String imgUrl) {
        Glide.with(this).load(imgUrl).into(new SimpleTarget<Drawable>() {
            @Override
            public void onResourceReady(@NonNull Drawable resource, @Nullable Transition<? super Drawable> transition) {
                qrIv.setImageDrawable(resource);
                resultIv.setImageBitmap(Util.getBitmapByView(WebViewActivity.this, bitmap_rl));
                Bitmap bitmap = ((BitmapDrawable) resultIv.getDrawable()).getBitmap();
                saveBitmap("picture", bitmap);

            }
        });
    }

    //使用IO流将bitmap对象存到本地指定文件夹
    public void saveBitmap(final String bitName, Bitmap bitmap) {
        try {
            String filePath = Environment.getExternalStorageDirectory().getPath();

            File fileDir = new File(filePath + "/DCIM/Camera/");
            if (!fileDir.exists()) {
                fileDir.mkdirs();
            }
            File file = new File(fileDir, bitName + "_" + System.currentTimeMillis() + ".png");
            file.createNewFile();

            FileOutputStream fOut = new FileOutputStream(file);
            if (null != bitmap) {
                bitmap.compress(Bitmap.CompressFormat.JPEG, 100, fOut);
            }

            MediaStore.Images.Media.insertImage(getContentResolver(),
                    file.getAbsolutePath(), file.getName(), null);
            Intent intent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
            Uri uri;
            if (Build.VERSION.SDK_INT >= 24) {
                uri = FileProvider.getUriForFile(getApplicationContext(), "com.example.administrator.myapplication.fileprovider", file);
            } else {
                uri = Uri.fromFile(file);
            }
            intent.setData(uri);
            sendBroadcast(intent);
            Message msg = Message.obtain();
            msg.what = 2;
            mHandler.sendMessage(msg);
            fOut.flush();
            fOut.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static boolean isExit = false;
    @SuppressLint("HandlerLeak")
    Handler mHandler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            switch (msg.what) {
                case 1:
                    isExit = false;
                    break;
                case 2:
                    Toast.makeText(WebViewActivity.this, "图片已保存，可直接转发", Toast.LENGTH_LONG).show();
                    break;
            }
        }
    };

    /**
     * 获取最新版本号
     */
    private void getVersion(){
        ApiUtil.getApiService().getVersion("3").enqueue(new Callback<EntityForSimple>() {
            @Override
            public void onResponse(Call<EntityForSimple> call, Response<EntityForSimple> response) {
                try {
                    EntityForSimple entity = response.body();
                    if (entity.isSuccess()) {
                        Gson gson = new Gson();
                        VersionEntity data = gson.fromJson(entity.getData(), VersionEntity.class);
                        if (NumberUtil.toFloat(data.getVersion()) > NumberUtil.toFloat(versionStr)){
                            MySharePerference.addSharePerference(WebViewActivity.this, Constant.NOW_VERSION, data.getVersion());
                            MyApplication.downLoadUrl = data.getAddress();
                            boolean isUpdate = !versionStr.equals(data.getVersion());
                            if (isUpdate){
                                DownLoaderTask task = new DownLoaderTask(MyApplication.downLoadUrl, MyApplication.wwwResourse + "/zip/", WebViewActivity.this);
                                task.execute();
                            }
                        }
                    } else {
                        try {
                            Toast.makeText(WebViewActivity.this, entity.getMessage(), Toast.LENGTH_SHORT).show();
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onFailure(Call<EntityForSimple> call, Throwable t) {
            }
        });
    }

    private void exit() {
        if (!isExit) {
            isExit = true;
            Toast.makeText(getApplicationContext(), "再按一次返回键退出币币PK",
                    Toast.LENGTH_SHORT).show();
            // 利用handler延迟发送更改状态信息
            mHandler.sendEmptyMessageDelayed(1, 1000);
        } else {
            super.onBackPressed();
            finish();
        }
    }

    @Override
    public void onBackPressed() {
        if (web_view.canGoBack()) {
            web_view.goBack();
        } else {
            exit();
        }
    }

    public class JsInterface {
        @JavascriptInterface
        public void openWechat(String str) {
            try {
                Log.v("openWechat", "openWechat");
                openApk("weixin");
            } catch (Exception e) {
                Toast.makeText(WebViewActivity.this, "未安装微信应用", Toast.LENGTH_SHORT).show();
                e.printStackTrace();
            }
        }

        @JavascriptInterface
        public void openQQ(String str) {
            try {
                Log.v("openQQ", "openQQ");
                openApk("qq");
            } catch (Exception e) {
                Toast.makeText(WebViewActivity.this, "未安装QQ应用", Toast.LENGTH_SHORT).show();
                e.printStackTrace();
            }
        }

        @JavascriptInterface
        public void saveQRImage(String str) {
            try {
                final String urlStr = str;
                Log.v("saveQRImage-->", str);
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (hasPermissionDismiss) {
                            initPermission();
                        } else {
                            getQrImg(urlStr);
                        }
                    }
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        @JavascriptInterface
        public void verifyWithRecapt(String serveTime) {
            Log.v("serveTime-->", serveTime);
            try {
                runOnUiThread(() -> {
//                    long time = System.currentTimeMillis() / 1000;//获取系统时间的10位的时间戳
//                    long addtime = Long.parseLong(serveTime) - time;
                    String param = MyApplication.getRealToken(serveTime);
                    web_view.loadUrl(String.format(Locale.getDefault(), "javascript:setToken('%s')", param));
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        @JavascriptInterface
        public void getTypeApp(String type) {
            Log.v("appType-->", type);
            try {
                runOnUiThread(() -> {
                    String param = "1";
                    web_view.loadUrl(String.format(Locale.getDefault(), "javascript:setAppType('%s')", param));
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        @JavascriptInterface
        public void clearHistory() {
            web_view.postDelayed(new Runnable() {
                @Override
                public void run() {
                    Log.v("clearHistory", "clearHistory");
                    web_view.clearHistory();
                }
            }, 1000);
        }

        @JavascriptInterface
        public void changeInput(String str) {
            try {
                runOnUiThread(() -> {
                    InpuChangeEvent event = new InpuChangeEvent();
                    event.setContent(str);
                    EventBus.getDefault().post(event);
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        @JavascriptInterface
        public void copyString(String str) {
            try {
                runOnUiThread(() ->
                    web_view.loadUrl(String.format(Locale.getDefault(), "javascript:checkCopyResult('%s')", Util.copyString(str)))
                );
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        @JavascriptInterface
        public void getAppVersion() {
            try {
                runOnUiThread(() -> {
                    if (!TextUtils.isEmpty(versionStr)){
                        Log.v("vvvvvv>", versionStr);
                        web_view.loadUrl(String.format(Locale.getDefault(), "javascript:receiveAppVersion('%s')", versionStr));
                    }
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        @JavascriptInterface
        public void backHome(String str) {
            try {
                runOnUiThread(() -> {
                    if (!TextUtils.isEmpty(str)){
                        Log.v("backHome>", str);
                        web_view.loadUrl(str);
                        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
                    }
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        @JavascriptInterface
        public void changeLandspace(String str) {
            try {
                runOnUiThread(() -> {
                    if (!TextUtils.isEmpty(str)){
                        Log.v("changeLandspace>", str);
                        if (str.equals("1")){//竖屏
                            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
                        }else {//横屏
                            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
                        }
                    }
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    }

    private void openImageChooserActivity() {
        DialogForPhoto dialog = new DialogForPhoto(this);
        dialog.setCancleListener((dialog1) -> {
            dialog1.dismiss();
            cancelCallback();
        });
        dialog.setSureListener((item) -> {
            switch (item) {
                case 1:
                    openCapture();
                    break;
                case 2:
                    openPick();
                    break;
                case 3:
                    cancelCallback();
                    break;
                default:
                    break;
            }
        });
        dialog.show();
    }

    /**
     * 打开相册
     */
    private void openPick() {
        Intent intent = new Intent(Intent.ACTION_PICK);
        intent.setType("image/*");
        startActivityForResult(intent, SYS_INTENT_REQUEST);
    }

    /**
     * 打开照相机拍照
     */
    private void openCapture() {
        String sdStatus = Environment.getExternalStorageState();
        /* 检测sd是否可用 */
        if (!sdStatus.equals(Environment.MEDIA_MOUNTED)) {
            return;
        }
        //图片名称 时间命名
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
        Date date = new Date(System.currentTimeMillis());
        filename = format.format(date);
        //创建File对象用于存储拍照的图片 SD卡根目录
        //File outputImage = new File(Environment.getExternalStorageDirectory(),test.jpg);
        //存储至DCIM文件夹
        File path = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM);
        File outputImage = new File(path, filename + ".jpg");
        try {
            if (outputImage.exists()) {
                outputImage.delete();
            }
            outputImage.createNewFile();
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (Build.VERSION.SDK_INT >= 24) {
            imageUri = FileProvider.getUriForFile(getApplicationContext(), "com.example.administrator.myapplication.fileprovider", outputImage);
        } else {
            imageUri = Uri.fromFile(outputImage);
        }
        Intent intent = new Intent("android.media.action.IMAGE_CAPTURE");
        intent.putExtra(MediaStore.EXTRA_OUTPUT, imageUri);
        startActivityForResult(intent, CAMERA_INTENT_REQUEST);
    }

    /**
     * 防止点击dialog的取消按钮之后，就不再次响应点击事件了
     */
    public void cancelCallback() {
        try {
            if (mUploadCallbackAboveL != null) {
                mUploadCallbackAboveL.onReceiveValue(null);
            }
            if (mUploadCallbackBelow != null) {
                mUploadCallbackBelow.onReceiveValue(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == SYS_INTENT_REQUEST) {
            if(resultCode == RESULT_OK && data != null){
                //            cameraCamera(data);
                if (null == data) {
                    return;
                }
                if (mUploadCallbackBelow != null) {
                    chooseBelow(resultCode, data);
                } else if (mUploadCallbackAboveL != null) {
                    chooseAbove(resultCode, data);
                } else {
                    Toast.makeText(this, "发生错误", Toast.LENGTH_SHORT).show();
                }
            }else {
                cancelCallback();
            }
        } else if (requestCode == CAMERA_INTENT_REQUEST) {
//            cameraCamera();
            if (null == mUploadCallbackAboveL && null == mUploadCallbackBelow) {
                return;
            }
            Uri result;
            if (resultCode == RESULT_CANCELED) {
                result = Uri.EMPTY;
            } else {
                if (data == null && resultCode != RESULT_OK) {
                    result = Uri.EMPTY;
                } else if (data == null) {
                    result = imageUri;
                } else {
                    result = data.getData();
                }
            }
            if (mUploadCallbackBelow != null) {
                mUploadCallbackBelow.onReceiveValue(result);
                mUploadCallbackBelow = null;
            }

            if (mUploadCallbackAboveL != null) {
                mUploadCallbackAboveL.onReceiveValue(new Uri[]{result});
                mUploadCallbackAboveL = null;
            }
        } else if (requestCode == IMAGE_CUT && resultCode == RESULT_OK) {
            if (null == data) {
                return;
            }
            if (mUploadCallbackBelow != null) {
                chooseBelow(resultCode, data);
            } else if (mUploadCallbackAboveL != null) {
                chooseAbove(resultCode, data);
            } else {
                Toast.makeText(this, "发生错误", Toast.LENGTH_SHORT).show();
            }
        } else if (requestCode == IMAGE_CUT && resultCode == RESULT_CANCELED) {
            cancelCallback();
        }
    }

    /**
     * @param data 相册选择后后获取照片
     */
    private void cameraCamera(Intent data) {
        Uri uri = data.getData();
        // 相册中文件绝对路径
        Intent intent = getImageClipIntent(uri);
        startActivityForResult(intent, IMAGE_CUT);
    }

    /**
     * 拍照后获取照片
     */
    private void cameraCamera() {
        Uri uri = null;
        if (imageUri != null) {
            uri = imageUri;
        }
        Intent intent = getImageClipIntent(uri);
        //广播刷新相册
        Intent intentBc = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
        intentBc.setData(imageUri);
        sendBroadcast(intentBc);
        startActivityForResult(intent, IMAGE_CUT);
    }

    /**
     * 获取剪切后的图片
     */
    public Intent getImageClipIntent(Uri uri) {
        //图片名称 时间命名
        File path = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM);
        File outputImage = new File(path, "1.jpg");
        try {
            if (outputImage.exists()) {
                outputImage.delete();
            }
            outputImage.createNewFile();
        } catch (IOException e) {
            e.printStackTrace();
        }
        //将File对象转换为Uri并启动照相程序
//        if (Build.VERSION.SDK_INT >= 24) {
//            photoUri = FileProvider.getUriForFile(getApplicationContext(), "com.example.administrator.myapplication.fileprovider", outputImage);
//        } else {
        photoUri = Uri.fromFile(outputImage);
//        }

        Intent intent = new Intent("com.android.camera.action.CROP", imageUri);
        intent.setDataAndType(uri, "image/*");
        intent.putExtra("scale", true);
        intent.putExtra("crop", true);
        intent.putExtra("aspectX", 1);// 裁剪框比例
        intent.putExtra("aspectY", 1);
        intent.putExtra("outputX", 200);// 输出图片大小
        intent.putExtra("outputY", 200);
        intent.putExtra(MediaStore.EXTRA_OUTPUT, photoUri);
        intent.putExtra("return-data", false);
        return intent;
    }

    /**
     * Android API < 21(Android 5.0)版本的回调处理
     *
     * @param resultCode 选取文件或拍照的返回码
     * @param data       选取文件或拍照的返回结果
     */
    private void chooseBelow(int resultCode, Intent data) {
        Log.e("WangJ", "返回调用方法--chooseBelow");
        if (RESULT_OK == resultCode) {
            updatePhotos();
            if (data != null) {
                // 这里是针对文件路径处理
                Uri uri = data.getData();
                if (uri != null) {
                    Log.e("WangJ", "系统返回URI：" + uri.toString());
                    mUploadCallbackBelow.onReceiveValue(uri);
                } else {
                    mUploadCallbackBelow.onReceiveValue(null);
                }
            } else {
                // 以指定图像存储路径的方式调起相机，成功后返回data为空
                Log.e("WangJ", "自定义结果：" + imageUri.toString());
                mUploadCallbackBelow.onReceiveValue(imageUri);
            }
        } else {
            mUploadCallbackBelow.onReceiveValue(null);
        }
        mUploadCallbackBelow = null;
    }

    /**
     * Android API >= 21(Android 5.0) 版本的回调处理
     *
     * @param resultCode 选取文件或拍照的返回码
     * @param data       选取文件或拍照的返回结果
     */
    private void chooseAbove(int resultCode, Intent data) {
        if (RESULT_OK == resultCode) {
            updatePhotos();
            if (data != null) {
                // 这里是针对从文件中选图片的处理
                Uri[] results;
                Uri uriData = data.getData();
                if (uriData != null) {
                    results = new Uri[]{uriData};
                    for (Uri uri : results) {
                        Log.e("WangJ", "系统返回URI：" + uri.toString());
                    }
                    mUploadCallbackAboveL.onReceiveValue(results);
                } else {
                    mUploadCallbackAboveL.onReceiveValue(null);
                }
            } else {
                Log.e("WangJ", "自定义结果：" + imageUri.toString());
                mUploadCallbackAboveL.onReceiveValue(new Uri[]{imageUri});
            }
        } else {
            mUploadCallbackAboveL.onReceiveValue(null);
        }
        mUploadCallbackAboveL = null;
    }

    private void updatePhotos() {
        // 该广播即使多发（即选取照片成功时也发送）也没有关系，只是唤醒系统刷新媒体文件
        Intent intent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
        intent.setData(imageUri);
        sendBroadcast(intent);
    }

    /**
     * 不再提示权限时的展示对话框
     */
    AlertDialog mPermissionDialog;
    String mPackName = "com.huawei.liwenzhi.weixinasr";

    private void showPermissionDialog() {
        if (mPermissionDialog == null) {
            mPermissionDialog = new AlertDialog.Builder(this)
                    .setMessage("已禁用权限，请手动授予")
                    .setPositiveButton("设置", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            cancelPermissionDialog();
                            Uri packageURI = Uri.parse("package:" + mPackName);
                            Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, packageURI);
                            startActivity(intent);
                        }
                    })
                    .setNegativeButton("取消", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            //关闭页面或者做其他操作
                            cancelPermissionDialog();
                        }
                    })
                    .create();
        }
        mPermissionDialog.show();
    }

    //关闭对话框
    private void cancelPermissionDialog() {
        mPermissionDialog.cancel();
    }

}
