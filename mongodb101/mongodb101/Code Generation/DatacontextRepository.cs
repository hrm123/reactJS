
    
using mongodb101.Models;
              
public class DatacontextRepository : Repository<datacontext>, IDatacontextRepository
{
    private datacontext _context;

    public DatacontextRepository(datacontext context) : base(context)
    {
        _context = context;
    }

    //Override any generic method for your own custom implemention, add new repository methods to the IDatacontextRepository.cs file
}
