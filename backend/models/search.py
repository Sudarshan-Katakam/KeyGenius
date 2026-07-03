from pydantic import BaseModel, Field


class SearchRequest(BaseModel):
    game_name: str = Field(..., alias="gameName")
    country: str

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "gameName": "carrom",
                "country": "IN"
            }
        }
