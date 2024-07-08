import { Connection, Repository, createConnection } from 'typeorm';
import { Movie } from '../entities/Movie';
import { Session } from '../entities/Session';

describe('Session Entity', () => {
  let connection: Connection;
  let sessionRepository: Repository<Session>;
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
    sessionRepository = connection.getRepository(Session);
    movieRepository = connection.getRepository(Movie);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.synchronize(true); // Limpar e recriar o esquema antes de cada teste
  });

  it('should create a session', async () => {
    const movie = new Movie();
    movie.name = 'Inception';
    movie.description = 'A mind-bending thriller';
    movie.image = 'image_url';
    movie.actors = ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'];
    movie.release_date = '03/12/2023';
    console.log(movie);

    const session = new Session();
    session.room = 'Room A';
    session.capacity = 100;
    session.day = '2024-07-20';
    session.time = '14:00';
    session.movie = movie;

    console.log(session);
    await movieRepository.save(movie);
    await sessionRepository.save(session);

    const savedSession = await sessionRepository.findOne({
      where: { id: session.id },
      relations: ['movie'],
    });
    console.log(savedSession);

    expect(savedSession).toBeDefined();
    expect(savedSession!.room).toBe('Room A');
    expect(savedSession!.capacity).toBe(100);
    expect(savedSession!.day).toBe('2024-07-20');
    expect(savedSession!.time).toBe('14:00');
    expect(savedSession!.movie).toBeDefined();
    expect(savedSession!.movie.name).toBe('Inception');
  });
});
