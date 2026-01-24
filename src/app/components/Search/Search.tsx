"use client";

import { useState } from "react";
import {
  Group,
  Avatar,
  Text,
  UnstyledButton,
  Stack,
  Popover,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import classes from "./search.module.scss";

const LOCATION_DATA = [
  {
    id: 1,
    tenViTri: "Quận 1",
    tinhThanh: "Hồ Chí Minh",
    hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt1.jpg",
  },
  {
    id: 2,
    tenViTri: "Cái Răng",
    tinhThanh: "Cần Thơ",
    hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt2.jpg",
  },
  {
    id: 3,
    tenViTri: "Hòn Rùa",
    tinhThanh: "Nha Trang",
    hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt3.jpg",
  },
  {
    id: 4,
    tenViTri: "Hoàn Kiếm",
    tinhThanh: "Hà Nội",
    hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt4.jpg",
  },
  {
    id: 5,
    tenViTri: "Hòn Tằm",
    tinhThanh: "Phú Quốc",
    hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt5.jpg",
  },
  {
    id: 6,
    tenViTri: "Hải Châu",
    tinhThanh: "Đà Nẵng",
    hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt6.jpg",
  },
  {
    id: 7,
    tenViTri: "Langbiang",
    tinhThanh: "Đà Lạt",
    hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt7.jpg",
  },
  {
    id: 8,
    tenViTri: "Mũi Né",
    tinhThanh: "Phan Thiết",
    hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt8.jpg",
  },
];
type Section = "location" | "date" | "guests" | null;

export default function Search() {
  const router = useRouter();

  const [active, setActive] = useState<Section>(null);
  const [location, setLocation] = useState<any>(null);
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
  const [guests, setGuests] = useState(1);

  const closeAll = () => setActive(null);

  const handleSearch = () => {
    if (!location) {
      alert("Vui lòng chọn địa điểm");
      return;
    }

    router.push(`/phong-thue?maViTri=${location.id}`);
  };

  return (
    <div
      className={classes.searchWrapper}
      onClick={closeAll} // 👈 click ngoài đóng toàn bộ
    >
      <div
        className={classes.searchBar}
        onClick={(e) => e.stopPropagation()} // 👈 chặn click lan ra ngoài
      >
        {/* LOCATION */}
        <Popover
          opened={active === "location"}
          position="bottom-start"
          width={350}
          radius="xl"
          trapFocus={false}
          withinPortal={false}
        >
          <Popover.Target>
            <div
              className={classes.searchSection}
              data-active={active === "location"}
              onClick={() => setActive("location")}
            >
              <span className={classes.label}>Địa điểm</span>
              <span className={classes.value}>
                {location?.tenViTri || "Tìm kiếm điểm đến"}
              </span>
            </div>
          </Popover.Target>

          <Popover.Dropdown className={classes.popoverContent}>
            <Text size="xs" fw={700} mb={10}>
              Điểm đến đề xuất
            </Text>

            <Stack gap={0}>
              {LOCATION_DATA.map((item) => (
                <UnstyledButton
                  key={item.id}
                  className={classes.locationItem}
                  onClick={() => {
                    setLocation(item);
                    setActive("date");
                  }}
                >
                  <Group>
                    <Avatar src={item.hinhAnh} radius="md" />
                    <div>
                      <Text fw={600}>{item.tenViTri}</Text>
                      <Text size="xs" c="dimmed">
                        {item.tinhThanh}
                      </Text>
                    </div>
                  </Group>
                </UnstyledButton>
              ))}
            </Stack>
          </Popover.Dropdown>
        </Popover>

        {/* DATE */}
        <Popover
          opened={active === "date"}
          position="bottom"
          radius="xl"
          trapFocus={false}
          withinPortal={false}
        >
          <Popover.Target>
            <div
              className={classes.searchSection}
              data-active={active === "date"}
              onClick={() => setActive("date")}
            >
              <span className={classes.label}>Thời gian</span>
              <span className={classes.value}>
                {range[0]
                  ? `${dayjs(range[0]).format("DD/MM")} - ${
                      range[1] ? dayjs(range[1]).format("DD/MM") : "..."
                    }`
                  : "Thêm ngày"}
              </span>
            </div>
          </Popover.Target>

          <Popover.Dropdown className={classes.popoverContent}>
            <DatePicker
              type="range"
              numberOfColumns={2}
              value={range}
              onChange={(val) => {
                setRange(val);
                if (val[0] && val[1]) setActive("guests");
              }}
            />
          </Popover.Dropdown>
        </Popover>

        {/* GUESTS */}
        <Popover
          opened={active === "guests"}
          position="bottom-end"
          radius="xl"
          trapFocus={false}
          withinPortal={false}
        >
          <Popover.Target>
            <div
              className={classes.searchSection}
              data-active={active === "guests"}
              onClick={() => setActive("guests")}
            >
              <span className={classes.label}>Khách</span>
              <span className={classes.value}>{guests} khách</span>
            </div>
          </Popover.Target>

          <Popover.Dropdown className={classes.popoverContent}>
            <Group justify="space-between">
              <Text fw={600}>Số khách</Text>
              <Group>
                <button onClick={() => setGuests(Math.max(1, guests - 1))}>
                  -
                </button>
                <Text>{guests}</Text>
                <button onClick={() => setGuests(guests + 1)}>+</button>
              </Group>
            </Group>
          </Popover.Dropdown>
        </Popover>

        {/* SEARCH */}
        <UnstyledButton className={classes.searchBtn} onClick={handleSearch}>
          <IconSearch size={18} stroke={3} />
          Tìm kiếm
        </UnstyledButton>
      </div>
    </div>
  );
}
