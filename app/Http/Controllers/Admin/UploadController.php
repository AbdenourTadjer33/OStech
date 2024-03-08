<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use Illuminate\Http\UploadedFile;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager as Image;

class UploadController extends Controller
{
    use HttpResponses;

    public function saveTemp(Request $request)
    {
        if (!$request->has('images') && !$request->has('image')) {
            return $this->error(null, 'data not found', 404);
        }

        return $this->success([
            'path' => $request->images ? $this->saveMany($request->images) : $this->save($request->image),
        ], 'Fichier uploaded avec succés', 200);
    }

    public function editTemp(Request $request)
    {
        $request->validate([
            'cropInfo' => ['required', 'array'],
        ]);

        if (!Storage::disk('media')->exists($request->path)) {
            return $this->error(null, 'image non trouvé', 404); 
        }

        $cropInfo = $request->cropInfo;

        $img = Image::gd()->read(Storage::disk('media')->get($request->path));

        $img->crop($cropInfo['width'], $cropInfo['height'], $cropInfo['x'], $cropInfo['y']);

        $img->toPng();

        $filename = 'media/temp/' . time() . '_' . Str::random(20) . '.png';

        $img->save($filename);

        Storage::disk('media')->delete($request->path);

        return $this->success([
            'path' => substr($filename, strpos($filename, '/') + 1),
        ], 'image modifier avec succés');
    }

    public function destroy(Request $request)
    {
        if (!Storage::disk('media')->exists($request->path)) {
            return $this->error(null, 'image non trouvé', 404);
        }

        if (!Storage::disk('media')->delete($request->path)) {
            return $this->error(null, 'something went wrong.', 500);
        }

        return $this->success(null, 'image supprimé avec succés');
    }

    private function save(UploadedFile $img)
    {
        return $img->store('temp', 'media');
    }

    private function saveMany(array $images)
    {
        $paths = [];
        /**
         * @var UploadedFileile $image
         */
        foreach ($images as $img) {
            $paths[] = $img->store('temp', 'media');
        }

        return $paths;
    }
}
