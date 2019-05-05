package com.example.administrator.myapplication.util;

import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.view.Window;
import android.view.WindowManager;

import com.example.administrator.myapplication.R;

/**
 * 选择照片dialog
 * author：wangqi on 2017/4/26 17:48
 * email：773630555@qq.com
 */
public class DialogForPhoto {

    private Context context;
    private Dialog dialog;
    private DialogInterface.OnCancelListener cancleListener;

    public DialogForPhoto(Context context) {
        super();
        this.context = context;
        // TODO Auto-generated constructor stub
    }

    /**
     * dialog的提示信息
     */
    public void show() {
        View view = LayoutInflater.from(context).inflate(R.layout.dialog_for_photo,null);
        view.findViewById(R.id.tv_take).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sure.onSure(1);
                dialog.dismiss();
            }
        });
        view.findViewById(R.id.tv_album).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sure.onSure(2);
                dialog.dismiss();
            }
        });
        view.findViewById(R.id.tv_cancel).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sure.onSure(3);
                dialog.dismiss();
            }
        });
        // 从下面滑
        dialog = new Dialog(context, R.style.ActionSheetDialogStyle);
        dialog.setContentView(view);
        dialog.setOnCancelListener(cancleListener);
        dialog.show();

        Window dialogWindow = dialog.getWindow();
        dialogWindow.setGravity(Gravity.LEFT | Gravity.BOTTOM);
        WindowManager.LayoutParams lp = dialogWindow.getAttributes();
        lp.x = 0;
        lp.y = 0;
        lp.width= LayoutParams.MATCH_PARENT;
        dialogWindow.setAttributes(lp);

    }

    public static interface Sure {
        void onSure(int item);
    }
    public Sure sure;
    /**
     * 点击确定回调的监听
     * @param sure
     */
    public void setSureListener(Sure sure) {
        this.sure = sure;
    }

    public void setCancleListener(DialogInterface.OnCancelListener cancleListener) {
        this.cancleListener = cancleListener;
    }
}

