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
import { useEffect, useRef } from "react";
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
  const [range, setRange] = useState<[string | null, string | null]>([
    null,
    null,
  ]);
  const [guests, setGuests] = useState(1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const dateDropdownRef = useRef<HTMLDivElement>(null);
  const guestsDropdownRef = useRef<HTMLDivElement>(null);
  const closeAll = () => setActive(null);

  useEffect(() => {
    const handleDocumentMouseDown = (e: MouseEvent) => {
      const path = (e as any).composedPath?.() || [];
      const refs = [
        wrapperRef.current,
        locationDropdownRef.current,
        dateDropdownRef.current,
        guestsDropdownRef.current,
      ];
      const isInside = path.some((el: any) => refs.includes(el));
      if (!isInside) {
        closeAll();
      }
    };
    document.addEventListener("mousedown", handleDocumentMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
    };
  }, []);

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
      ref={wrapperRef}
    >
      <div
        className={classes.searchBar}
        onClick={(e) => e.stopPropagation()} // 👈 chặn click lan ra ngoài
      >
        {/* LOCATION */}
        <Popover
          opened={active === "location"}
          onClose={() => setActive(null)}
          position="bottom-start"
          width={350}
          radius="xl"
          shadow="md"
          trapFocus={false}
          closeOnClickOutside={true}
          closeOnEscape={true}
          withinPortal={true}
          clickOutsideEvents={['mousedown', 'touchstart']}
        >
          <Popover.Target>
            <div
              className={classes.searchSection}
              data-active={active === "location"}
              onMouseDown={(e) => {
                e.stopPropagation();
                setActive(active === "location" ? null : "location");
              }}
            >
              <span className={classes.label}>Địa điểm</span>
              <span className={classes.value}>
                {location?.tenViTri || "Tìm kiếm điểm đến"}
              </span>
            </div>
          </Popover.Target>

          <Popover.Dropdown className={classes.popoverContent} ref={locationDropdownRef}>
            <Text size="xs" fw={700} mb={20}>
              Điểm đến đề xuất
            </Text>

            <div className={classes.locationDropdown}>
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
                  <Group gap="sm">
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
            </div>
          </Popover.Dropdown>
        </Popover>

        {/* DATE */}
        <Popover
          opened={active === "date"}
          onClose={() => setActive(null)}
          position="bottom"
          radius="xl"
          shadow="md"
          trapFocus={false}
          closeOnClickOutside={true}
          closeOnEscape={true}
          withinPortal={true}
          clickOutsideEvents={['mousedown', 'touchstart']}
        >
          <Popover.Target>
            <div
              className={classes.searchSection}
              data-active={active === "date"}
              onMouseDown={(e) => {
                e.stopPropagation();
                setActive(active === "date" ? null : "date");
              }}
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

          <Popover.Dropdown className={classes.popoverContent} ref={dateDropdownRef}>
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
          onClose={() => setActive(null)}
          position="bottom-end"
          radius="xl"
          shadow="md"
          trapFocus={false}
          closeOnClickOutside={true}
          closeOnEscape={true}
          withinPortal={true}
          clickOutsideEvents={['mousedown', 'touchstart']}
        >
          <Popover.Target>
            <div
              className={classes.searchSection}
              data-active={active === "guests"}
              onMouseDown={(e) => {
                e.stopPropagation();
                setActive(active === "guests" ? null : "guests");
              }}
            >
              <span className={classes.label}>Khách</span>
              <span className={classes.value}>{guests} khách</span>
            </div>
          </Popover.Target>

          <Popover.Dropdown className={classes.popoverContent} ref={guestsDropdownRef}>
            <Group justify="space-between" gap="md">
              <Text fw={600}>Số khách</Text>
              <Group gap="md" align="center">
                <button 
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '1px solid #ddd',
                    borderRadius: '50%',
                    background: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '500'
                  }}
                  disabled={guests <= 1}
                >
                  -
                </button>
                <Text fw={600} style={{ minWidth: '40px', textAlign: 'center' }}>{guests}</Text>
                <button 
                  onClick={() => setGuests(guests + 1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '1px solid #ddd',
                    borderRadius: '50%',
                    background: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '500'
                  }}
                >
                  +
                </button>
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
