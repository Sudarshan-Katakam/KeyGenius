from pydantic import BaseModel, ConfigDict, Field


class SearchRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True, json_schema_extra={"example": {"gameName": "carrom", "country": "IN"}})

    game_name: str = Field(..., alias="gameName")
    country: str
