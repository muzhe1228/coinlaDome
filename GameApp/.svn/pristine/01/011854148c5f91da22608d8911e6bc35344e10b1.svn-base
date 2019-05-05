package com.example.administrator.myapplication.util.network;

import com.example.administrator.myapplication.MyApplication;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import okhttp3.ConnectionPool;
import okhttp3.Interceptor;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.converter.scalars.ScalarsConverterFactory;

/**
 * author：wangqi on 2018/1/4 16:39
 * 数据请求控制工具类
 */
public class ApiUtil {
    private static final String HOST = MyApplication.baseurl;//换成你上传用的服务器地址
    private static Retrofit retrofit;
    private static final int DEFAULT_TIMEOUT = 3;//超时时长，单位：秒

    /**
     * 获取根服务地址
     */
    public static String getHOST() {
        return HOST;
    }

    /**
     * 初始化 Retrofit
     * @return Retrofit实体
     */
    private static Retrofit getApiRetrofit() {
        if (retrofit == null) {

            //日志
            HttpLoggingInterceptor loggingInterceptor=new HttpLoggingInterceptor();
            OkHttpClient.Builder okHttpBuilder = new OkHttpClient.Builder();
            //日志
            //Header拦截器
            okHttpBuilder.addInterceptor(new Interceptor() {
                @Override
                public Response intercept(Chain chain) throws IOException {
                    Request request = chain.request()
                            .newBuilder()
                            .build();
                    return chain.proceed(request);
                }
            }).addInterceptor(loggingInterceptor);
            okHttpBuilder
                    .connectTimeout(DEFAULT_TIMEOUT, TimeUnit.SECONDS)
                    .connectionPool(new ConnectionPool(5,2, TimeUnit.SECONDS));

            retrofit = new Retrofit.Builder()
                    .client(okHttpBuilder.build())
                    .baseUrl(HOST)
                    //增加返回值为String的支持
                    .addConverterFactory(ScalarsConverterFactory.create())
                    //增加返回值为Gson的支持(以实体类返回)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit;
    }

    /**
     * 创建数据请求服务
     * @return ApiService实体
     */
    public static ApiService getApiService() {
        return ApiUtil.getApiRetrofit().create(ApiService.class);
    }

    /**
     * 上传文件数据处理
     * @param filePaths
     * @return 文件的键值对MAP
     */
    public static Map<String,RequestBody> upload(String... filePaths){
        Map<String,RequestBody> bodyMap = new HashMap<>();
        for(String filePath:filePaths){
            File file = new File(filePath);//filePath 图片地址
            RequestBody imageBody = RequestBody.create(MediaType.parse("multipart/form-data"), file);
            bodyMap.put("file"+"\";filename=\""+file.getName(),imageBody);
        }
        return bodyMap;
    }

}