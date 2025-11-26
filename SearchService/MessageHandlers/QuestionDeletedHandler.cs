using Contracts;
using SearchService.Models;
using Typesense;

namespace SearchService.MessageHandlers;

public class QuestionDeletedHandler(ITypesenseClient tsClient)
{
    public async Task Handle(QuestionDeleted message)
    {
        await tsClient.DeleteDocument<SearchQuestion>("questions", message.QuestionId);
    }
}