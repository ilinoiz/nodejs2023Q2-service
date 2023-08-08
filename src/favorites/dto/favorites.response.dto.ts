import { Album } from 'src/data-access/entities/album.entity';
import { Artist } from 'src/data-access/entities/artist.entity';
import { Track } from 'src/data-access/entities/track.entity';

export class FavoritesResponseDto {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
