"""Backend tests for Abel & Merlyn wedding site."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://merlyn-abel.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"
ADMIN_PW = "abelsteffy2026"
ADMIN_HEADER = {"X-Admin-Password": ADMIN_PW}


# ---------- RSVP ----------
class TestRSVP:
    def test_create_rsvp(self):
        r = requests.post(f"{API}/rsvp", json={"name": "TEST_Guest", "guest_count": 2})
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["name"] == "TEST_Guest"
        assert d["guest_count"] == 2
        assert "id" in d and "created_at" in d

    def test_list_rsvp_no_auth(self):
        r = requests.get(f"{API}/rsvp")
        assert r.status_code == 401

    def test_list_rsvp_wrong_auth(self):
        r = requests.get(f"{API}/rsvp", headers={"X-Admin-Password": "wrong"})
        assert r.status_code == 401

    def test_list_rsvp_with_auth(self):
        # create then list
        c = requests.post(f"{API}/rsvp", json={"name": "TEST_ListGuest", "guest_count": 3})
        assert c.status_code == 200
        r = requests.get(f"{API}/rsvp", headers=ADMIN_HEADER)
        assert r.status_code == 200
        names = [x["name"] for x in r.json()]
        assert "TEST_ListGuest" in names

    def test_rsvp_invalid_count(self):
        r = requests.post(f"{API}/rsvp", json={"name": "X", "guest_count": 0})
        assert r.status_code == 422


# ---------- Guestbook ----------
class TestGuestbook:
    created_id = None

    def test_create_blessing(self):
        r = requests.post(f"{API}/guestbook", json={"name": "TEST_Blesser", "message": "Congrats!"})
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["name"] == "TEST_Blesser"
        assert d["message"] == "Congrats!"
        assert "id" in d
        TestGuestbook.created_id = d["id"]

    def test_list_blessings_public(self):
        r = requests.get(f"{API}/guestbook")
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_update_blessing_no_auth(self):
        assert TestGuestbook.created_id
        r = requests.put(f"{API}/guestbook/{TestGuestbook.created_id}", json={"message": "Edited"})
        assert r.status_code == 401

    def test_update_blessing_with_auth(self):
        assert TestGuestbook.created_id
        r = requests.put(f"{API}/guestbook/{TestGuestbook.created_id}",
                         json={"message": "TEST_Edited"}, headers=ADMIN_HEADER)
        assert r.status_code == 200
        assert r.json()["message"] == "TEST_Edited"
        # verify persistence
        r2 = requests.get(f"{API}/guestbook")
        matched = [x for x in r2.json() if x["id"] == TestGuestbook.created_id]
        assert matched and matched[0]["message"] == "TEST_Edited"

    def test_delete_blessing_no_auth(self):
        assert TestGuestbook.created_id
        r = requests.delete(f"{API}/guestbook/{TestGuestbook.created_id}")
        assert r.status_code == 401

    def test_delete_blessing_with_auth(self):
        assert TestGuestbook.created_id
        r = requests.delete(f"{API}/guestbook/{TestGuestbook.created_id}", headers=ADMIN_HEADER)
        assert r.status_code == 200
        # verify removal
        r2 = requests.get(f"{API}/guestbook")
        ids = [x["id"] for x in r2.json()]
        assert TestGuestbook.created_id not in ids

    def test_delete_nonexistent(self):
        r = requests.delete(f"{API}/guestbook/nonexistent-id", headers=ADMIN_HEADER)
        assert r.status_code == 404

    def test_create_blessing_empty(self):
        r = requests.post(f"{API}/guestbook", json={"name": "", "message": ""})
        assert r.status_code == 400


# ---------- Admin ----------
class TestAdmin:
    def test_admin_login_correct(self):
        r = requests.post(f"{API}/admin/login", json={"password": ADMIN_PW})
        assert r.status_code == 200
        assert r.json().get("ok") is True

    def test_admin_login_wrong(self):
        r = requests.post(f"{API}/admin/login", json={"password": "wrong"})
        assert r.status_code == 401
