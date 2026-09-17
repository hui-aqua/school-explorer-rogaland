import json
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class SchoolDataTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.schools = json.loads((ROOT / "data" / "schools.json").read_text(encoding="utf-8"))

    def test_scope_and_unique_ids(self):
        self.assertEqual(len(self.schools), 103)
        self.assertEqual(len({school["id"] for school in self.schools}), 103)
        self.assertEqual({school["municipality"] for school in self.schools}, {"Sola", "Stavanger", "Sandnes"})

    def test_map_coverage(self):
        self.assertEqual(sum(bool(school["showOnMap"]) for school in self.schools), 22)
        self.assertTrue(all(isinstance(school["latitude"], (int, float)) for school in self.schools))
        self.assertTrue(all(isinstance(school["longitude"], (int, float)) for school in self.schools))

    def test_provenance_and_ranges(self):
        self.assertTrue(all(str(school["sourceUrl"]).startswith("https://skoleoversikten.no/skoler/") for school in self.schools))
        for school in self.schools:
            if school["wellbeing"] is not None:
                self.assertGreaterEqual(school["wellbeing"], 1)
                self.assertLessEqual(school["wellbeing"], 5)
                self.assertIsNotNone(school["wellbeingYear"])
                self.assertIsNotNone(school["surveyGrade"])
            if school["bullying"] is not None:
                self.assertGreaterEqual(school["bullying"], 0)
                self.assertLessEqual(school["bullying"], 100)
                self.assertIsNotNone(school["bullyingYear"])
                self.assertIsNotNone(school["surveyGrade"])


if __name__ == "__main__":
    unittest.main()
