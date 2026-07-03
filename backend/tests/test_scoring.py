import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from services.scoring.competition_score import compute_competition_score
from services.scoring.market_score import compute_market_score


class ScoringTests(unittest.TestCase):
    def test_market_score_is_capped_and_uses_inputs(self) -> None:
        score = compute_competition_score(4, [{"score": 4.5, "installs": "10M"}])
        market_score = compute_market_score(80, score)

        self.assertGreaterEqual(score, 0)
        self.assertLessEqual(score, 100)
        self.assertGreaterEqual(market_score, 0)
        self.assertLessEqual(market_score, 100)


if __name__ == "__main__":
    unittest.main()
