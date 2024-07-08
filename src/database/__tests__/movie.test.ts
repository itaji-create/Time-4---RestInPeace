import { Connection, Repository, createConnection } from 'typeorm';

import { Movie } from '../entities/Movie';
import { Session } from '../entities/Session';

describe('Movie Entity', () => {
  let connection: Connection;
  let movieRepository: Repository<Movie>;

  beforeAll(async () => {
    connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [Movie, Session],
      synchronize: true,
      logging: false,
    });
    movieRepository = connection.getRepository(Movie);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.synchronize(true); // Limpar e recriar o esquema antes de cada teste
  });

  it('should create a movie with formatted release date', async () => {
    const movie = new Movie();
    movie.name = 'Inception';
    movie.description = 'A mind-bending thriller';
    movie.image = 'image_url';
    movie.actors = ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'];
    movie.release_date = '03/12/2023';

    await movieRepository.save(movie);

    const savedMovie = await movieRepository.findOne({
      where: { name: 'Inception' },
    });
    expect(savedMovie).toBeDefined();
    expect(savedMovie!.name).toBe('Inception');
    expect(savedMovie!.description).toBe('A mind-bending thriller');
    expect(savedMovie!.release_date).toBe('03/12/2023');
  });

  it('should not allow duplicate movie names', async () => {
    const movie1 = new Movie();
    movie1.name = 'Duplicate Test';
    movie1.description = 'First Entry';
    movie1.image = 'image_url';
    movie1.actors = ['Actor 1'];
    movie1.release_date = '03/12/2023';

    const movie2 = new Movie();
    movie2.name = 'Duplicate Test';
    movie2.description = 'Second Entry';
    movie2.image = 'image_url';
    movie2.actors = ['Actor 2'];
    movie2.release_date = '03/12/2023';

    await movieRepository.save(movie1);

    await expect(movieRepository.save(movie2)).rejects.toThrow();
  });
  it('should handle movie sessions relationship', async () => {
    const movie = new Movie();
    movie.name = 'Interstellar';
    movie.description = 'A space exploration epic';
    movie.image = 'image_url';
    movie.actors = ['Matthew McConaughey', 'Anne Hathaway'];
    movie.release_date = '2024-07-15';

    const session = new Session();
    session.room = 'Room A';
    session.capacity = 100;
    session.day = '2024-07-20';
    session.time = '14:00';

    movie.sessions = [session];

    await movieRepository.save(movie);

    const savedMovie = await movieRepository.findOne({
      where: { name: 'Interstellar' },
      relations: ['sessions'],
    });
    expect(savedMovie).toBeDefined();
    expect(savedMovie!.sessions).toHaveLength(1);
    expect(savedMovie!.sessions[0].room).toBe('Room A');
    expect(savedMovie!.sessions[0].capacity).toBe(100);
    expect(savedMovie!.sessions[0].day).toBe('2024-07-20');
    expect(savedMovie!.sessions[0].time).toBe('14:00');
  });
});
