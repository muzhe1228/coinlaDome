package com.example.administrator.myapplication.util.network;

import retrofit2.Call;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface ApiService {
    /**
     * 获取更新
     * @return
     */
    @POST("/uac/user/selectAppVersion")
    Call<EntityForSimple> getVersion(@Query("urlType") String urlType);

}
