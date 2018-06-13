namespace PathFinder.Data
{
    public static class Database
    {
        public static readonly IDatabaseConnection Connection = new MockDatabase();
    }
}