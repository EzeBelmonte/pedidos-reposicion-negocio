package com.patasypatitas.app;

import android.content.ContentValues;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;
import android.util.Base64;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.OutputStream;

@CapacitorPlugin(name = "NativeDownload")
public class DownloadPlugin extends Plugin {

    @PluginMethod
    public void saveToDownloads(PluginCall call) {

        String fileName = call.getString(
            "fileName",
            "pedidos-realizados.xlsx"
        );

        String data = call.getString("data");

        if (data == null) {
            call.reject(
                "No se recibió el contenido del archivo."
            );
            return;
        }

        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {
            call.reject(
                "Esta función requiere Android 10 o superior."
            );
            return;
        }

        Uri uri = null;

        try {

            // Convertimos el Base64 recibido desde React
            // nuevamente a bytes.
            byte[] fileBytes = Base64.decode(
                data,
                Base64.DEFAULT
            );

            ContentValues values =
                new ContentValues();

            values.put(
                MediaStore.Downloads.DISPLAY_NAME,
                fileName
            );

            values.put(
                MediaStore.Downloads.MIME_TYPE,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );

            values.put(
                MediaStore.Downloads.IS_PENDING,
                1
            );

            Uri collection =
                MediaStore.Downloads.getContentUri(
                    MediaStore.VOLUME_EXTERNAL_PRIMARY
                );

            uri = getContext()
                .getContentResolver()
                .insert(
                    collection,
                    values
                );

            if (uri == null) {
                call.reject(
                    "No se pudo crear el archivo en Descargas."
                );
                return;
            }

            try (
                OutputStream output =
                    getContext()
                        .getContentResolver()
                        .openOutputStream(uri)
            ) {

                if (output == null) {
                    throw new Exception(
                        "No se pudo abrir el archivo."
                    );
                }

                output.write(fileBytes);
            }

            ContentValues finishedValues =
                new ContentValues();

            finishedValues.put(
                MediaStore.Downloads.IS_PENDING,
                0
            );

            getContext()
                .getContentResolver()
                .update(
                    uri,
                    finishedValues,
                    null,
                    null
                );

            JSObject result =
                new JSObject();

            result.put(
                "uri",
                uri.toString()
            );

            call.resolve(result);

        } catch (Exception error) {

            if (uri != null) {
                getContext()
                    .getContentResolver()
                    .delete(
                        uri,
                        null,
                        null
                    );
            }

            call.reject(
                "No se pudo guardar el archivo.",
                error
            );
        }
    }
}